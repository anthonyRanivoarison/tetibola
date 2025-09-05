import { Router } from "express";
import {verifyAuthToken} from "../controllers/authControllers.js";
import { postIncomes, getIncomes, getIncomesById, putIncomesById, deleteIncomesById } from "../controllers/incomeController.js";

const incomesRouter = Router();

incomesRouter.get('/', verifyAuthToken, getIncomes); // list incomes
incomesRouter.post('/', verifyAuthToken, postIncomes); // create a new income
incomesRouter.get('/:id', verifyAuthToken, getIncomesById);// get an income
incomesRouter.put('/:id', verifyAuthToken, putIncomesById); // update an income
incomesRouter.delete('/:id', verifyAuthToken, deleteIncomesById); // delete an income


export default incomesRouter;