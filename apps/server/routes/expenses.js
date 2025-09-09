import { Router } from "express";
import multer from "multer";
import { getExpenses, getExpensesById, postExpenses, putExpensesById, deleteExpensesById } from "../controllers/expenseController.js";
import {verifyAuthToken} from "../controllers/authControllers.js";

const upload = multer({ dest: "uploads/" });
const expensesRouter = Router();

expensesRouter.get("/", verifyAuthToken, getExpenses);
expensesRouter.get("/:id", verifyAuthToken, getExpensesById);
expensesRouter.post("/", verifyAuthToken, upload.single("receipt_upload"), postExpenses);
expensesRouter.put("/:id", verifyAuthToken, upload.single("receipt_upload"), putExpensesById);
expensesRouter.delete("/:id", verifyAuthToken, deleteExpensesById);

export default expensesRouter;