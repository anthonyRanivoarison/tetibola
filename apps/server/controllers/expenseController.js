import { insertExpense, findUserExpenses, findExpenseById, deleteExpenseById, updateExpense } from "./expenseDB.js";

// GET /api/expenses
export const getExpenses = async (req, res) => {
  try {
    const { start, end, reccuring } = req.query;
    const recurringFilter = reccuring !== undefined ? reccuring === "true" : null;
    const result = await findUserExpenses(start, end, recurringFilter);
    res.status(200).json(result.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// GET /api/expenses/:id
export const getExpensesById = async (req, res) => {
  try {
    const result = await findExpenseById(req.params.id);
    if (result.rows.length === 0) return res.status(404).json({ error: "Expense not found" });
    res.status(200).json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// POST /api/expenses
export const postExpenses = async (req, res) => {
  try {
    const { amount, date, description, reccuring, startDate, endDate } = req.body;
    const receiptUpload = req.file ? req.file.path : null;
    const userId = req.user.id; // nécessite un middleware d’auth

    const result = await insertExpense(amount, date, description, reccuring === "true", startDate, endDate, receiptUpload, userId);
    res.status(201).json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// PUT /api/expenses/:id
export const putExpensesById = async (req, res) => {
  try {
    const fields = { ...req.body };
    if (req.file) fields.receipt_upload = req.file.path;
    if (fields.reccuring !== undefined) fields.reccuring = fields.reccuring === "true";
    const result = await updateExpense(req.params.id, fields);
    res.status(200).json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// DELETE /api/expenses/:id
export const deleteExpensesById = async (req, res) => {
  try {
    await deleteExpenseById(req.params.id);
    res.status(204).send();
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
