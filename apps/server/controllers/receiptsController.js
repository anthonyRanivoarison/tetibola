import fs from 'fs';
import path from 'path';
import Busboy from 'busboy';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import {
  getAllReceiptsFromDB,
  insertReceipt,
  getReceiptById,
  deleteReceiptById
} from '../models/receiptsDB.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const uploadDir = path.join(__dirname, '..', 'uploads');

if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

export const uploadReceipt = (req, res) => {
  const busboy = new Busboy({
    headers: req.headers,
    limits: { fileSize: 5 * 1024 * 1024 },
  });

  let uploadSuccess = false;

  busboy.on('file', (fieldname, file, filename, encoding, mimetype) => {
    if (mimetype !== 'application/pdf') {
      return res.status(400).json({ error: 'Seuls les fichiers PDF sont autorisés.' });
    }

    const uniqueName = `${Date.now()}-${filename}`;
    const saveTo = path.join(uploadDir, uniqueName);
    const writeStream = fs.createWriteStream(saveTo);

    file.pipe(writeStream);

    writeStream.on('finish', async () => {
      uploadSuccess = true;
      try {
        const receipt = await insertReceipt(uniqueName, `uploads/${uniqueName}`);
        res.status(200).json({ message: 'Fichier enregistré', data: receipt });
      } catch (err) {
        res.status(500).json({ error: 'Erreur base de données.' });
      }
    });

    writeStream.on('error', () => {
      res.status(500).json({ error: 'Erreur écriture fichier.' });
    });
  });

  busboy.on('finish', () => {
    if (!uploadSuccess) {
      res.status(400).json({ error: 'Aucun fichier ou fichier invalide.' });
    }
  });

  req.pipe(busboy);
};

export const getAllReceipts = async (req, res) => {
  try {
    const result = await getAllReceiptsFromDB();
    res.status(200).json(result.rows);
  } catch (err) {
    res.status(500).json({ error: 'Erreur récupération reçus.' });
  }
};

export const getReceipt = (req, res) => {
  const { filename } = req.params;
  const filePath = path.join(uploadDir, filename);

  if (!fs.existsSync(filePath)) {
    return res.status(404).json({ error: 'Fichier introuvable.' });
  }

  res.setHeader('Content-Type', 'application/pdf');
  res.setHeader('Content-Disposition', `inline; filename="${filename}"`);
  fs.createReadStream(filePath).pipe(res);
};

export const deleteReceipt = async (req, res) => {
  const { id } = req.params;

  try {
    const receipt = await getReceiptById(id);

    if (!receipt) {
      return res.status(404).json({ error: 'Reçu introuvable.' });
    }

    const filePath = path.join(__dirname, '..', receipt.path);
    if (fs.existsSync(filePath)) {
      fs.unlinkSync(filePath);
    }

    await deleteReceiptById(id);

    res.status(200).json({ message: 'Reçu supprimé.' });
  } catch (err) {
    res.status(500).json({ error: 'Erreur suppression reçu.' });
  }
};
