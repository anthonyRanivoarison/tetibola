import { Router } from "express";
import multer from "multer";
import { getExpenses, getExpensesById, postExpenses, putExpensesById, deleteExpensesById } from "../controllers/expenseController.js";

const upload = multer({ dest: "uploads/" }); // pour gérer les fichiers reçus
const expensesRouter = Router();

expensesRouter.get("/", getExpenses);
expensesRouter.get("/:id", getExpensesById);
expensesRouter.post("/", upload.single("receipt"), postExpenses);
expensesRouter.put("/:id", upload.single("receipt"), putExpensesById);
expensesRouter.delete("/:id", deleteExpensesById);

export default expensesRouter;
