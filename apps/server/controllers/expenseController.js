import {
  insertExpense,
  findUserExpenses,
  findExpenseById,
  deleteExpenseById,
  updateExpense
} from "../models/expensesDB.js";

export const getExpenses = async (req, res) => {
  try {
    const userId = req.user.id;

    const {start, end, recurring} = req.query || {};
    const startDate = start || null;
    const endDate = end || null;
    const recurringFilter = recurring !== undefined ? recurring === "true" : null;


    const result = await findUserExpenses(userId, startDate, endDate, recurringFilter);
    res.status(200).json(result.rows);
  } catch (err) {
    res.status(500).json({error: err.message});
  }
};

export const getExpensesById = async (req, res) => {
  try {
    const result = await findExpenseById(req.params.id);
    if (result.rows.length === 0) return res.status(404).json({error: "Expense not found"});
    res.status(200).json(result.rows[0]);
  } catch (err) {
    res.status(500).json({error: err.message});
  }
};

export const postExpenses = async (req, res) => {
  try {
    const {amount, date, description, reccuring, startDate, endDate} = req.body;
    const receiptUpload = req.file ? req.file.path : null;
    const userId = req.user.id;

    const result = await insertExpense(amount, date, description, reccuring === "true", startDate, endDate, receiptUpload, userId);
    console.log("Result", result);
    res.status(201).json({message: "Expenses created"});
  } catch (err) {
    console.error(err)
    res.status(500).json({error: err});
  }
};

export const putExpensesById = async (req, res) => {
  try {
    const fields = {...req.body};

    if (req.file) fields.receipt_upload = req.file.path;

    if ("reccuring" in fields) {
      fields.reccuring = fields.reccuring === "true" || fields.reccuring === true;
    }

    const result = await updateExpense(req.params.id, fields);

    if (result.rowCount === 0) {
      return res.status(404).json({error: "Expense not found"});
    }

    res.status(200).json(result.rows[0]);
  } catch (err) {
    console.error("❌ Update error:", err.message);
    res.status(500).json({error: err.message});
  }
};

export const deleteExpensesById = async (req, res) => {
  try {
    await deleteExpenseById(req.params.id);
    res.status(200).json({message: "Expense deleted"});
  } catch (err) {
    res.status(500).json({error: err.message});
  }
};