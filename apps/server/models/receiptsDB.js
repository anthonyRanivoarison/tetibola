import { pool } from './connectionToDB.js';

export const getAllReceiptsFromDB = async () => {
    return await pool.query('SELECT * FROM receipts ORDER BY uploaded_at DESC');
};

export const insertReceipt = async (filename, path) => {
    const result = await pool.query(
        'INSERT INTO receipts (filename, path) VALUES ($1, $2) RETURNING *',
        [filename, path]
    );
    return result.rows[0];
};

export const getReceiptById = async (id) => {
    const result = await pool.query('SELECT * FROM receipts WHERE id = $1', [id]);
    return result.rows[0];
};

export const deleteReceiptById = async (id) => {
    return await pool.query('DELETE FROM receipts WHERE id = $1', [id]);
};


export default receiptsRouter;

