import { Router } from "express";
import {
    uploadReceipt,
    getAllReceipts,
    getReceipt,
    deleteReceipt
} from '../controllers/receiptsController.js';

const incomesRouter = Router();

incomesRouter.post('/upload', uploadReceipt);
incomesRouter.get('/', getAllReceipts);
incomesRouter.get('/:filename', getReceipt);
incomesRouter.delete('/:id', deleteReceipt);

// incomesRouter.get('/', getIncomes); // list incomes
// incomesRouter.post('/', postIncomes); // create a new income
// incomesRouter.get('/:id', postIncomesById);// get an income
// incomesRouter.put('/:id', putIncomesById); // update an income
// incomesRouter.delete('/:id', deleteIncomesById); // delete an income


export default incomesRouter;