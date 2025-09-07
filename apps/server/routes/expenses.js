import { Router } from "express";
import multer from "multer";
import { getExpenses, getExpensesById, postExpenses, putExpensesById, deleteExpensesById } from "../controllers/expenseController.js";

const upload = multer({ dest: "uploads/" });
const expensesRouter = Router();

expensesRouter.get("/", getExpenses);
expensesRouter.get("/:id", getExpensesById);
expensesRouter.post("/", upload.single("receipt_upload"), postExpenses);
expensesRouter.put("/:id", upload.single("receipt_upload"), putExpensesById);
expensesRouter.delete("/:id", deleteExpensesById);

export default expensesRouter;
