import {
  getAllCategory,
  insertCategory,
  updateCategoryById,
  deleteCategoryById
} from "../models/categoriesDB.js";
import {connection} from "../models/connectionToDB.js";

const sanitizeAndValidInput = (input) => {
  if (!input) {
    return {Message: "This field is required"};
  }
  if (input.length > 25) {
    return {Message: "Category name is too long"};
  }
  if (!/^[\w. ,]+$/.test(input)) {
    return {Message: "Category name contains invalid characters"};
  }
  return null;
};

export const getCategories = async (req, res) => {
  const userId = req.user.id;
  try {
    const result = await getAllCategory(userId);
    res.status(200).json(result.rows);
  } catch (error) {
    console.error("GetCategories error:", error);
    res.status(500).json({error: "Erreur lors de la récupération des catégories"});
  }
};

export const createCategory = async (req, res) => {
  const {name, is_active} = req.body;

  try {
    const result = await connection.query(
      "INSERT INTO category (name, is_active) VALUES ($1, $2) RETURNING *",
      [name, is_active ?? true]
    );

    res.status(201).json(result.rows[0]);
  } catch (error) {
    console.error("❌ createCategory error:", error);
    res.status(500).json({error: "Erreur lors de la création de la catégorie"});
  }
};

export const assignCategoryToExpense = async (req, res) => {
  const {expense_id, category_id} = req.body;

  try {
    const result = await connection.query(
      "INSERT INTO expenses_category (expense_id, category_id) VALUES ($1, $2) RETURNING *",
      [expense_id, category_id]
    );

    res.status(201).json(result.rows[0]);
  } catch (error) {
    console.error("❌ assignCategoryToExpense error:", error);
    res.status(500).json({error: "Erreur lors de l'association dépense/catégorie"});
  }
};

export const getCategoriesByExpense = async (req, res) => {
  const {expenseId} = req.params;

  try {
    const result = await connection.query(
      `SELECT c.*
       FROM category c
                JOIN expenses_category ec ON c.id = ec.category_id
       WHERE ec.expense_id = $1`,
      [expenseId]
    );

    res.status(200).json(result.rows);
  } catch (error) {
    console.error("❌ getCategoriesByExpense error:", error);
    res.status(500).json({error: "Erreur lors de la récupération des catégories de la dépense"});
  }
};

export const putCategoryById = async (req, res) => {
  const userId = req.user.id;
  const {name} = req.body;
  const {categoryId} = req.params;

  if (!name || name.length > 25 || !/^[\w. ,]+$/.test(name)) {
    return res.status(400).json({Message: "Invalid category name"});
  }

  try {
    const result = await updateCategoryById(categoryId, userId, name);
    if (result.rowCount === 0) {
      return res.status(404).json({Message: "Category not found or you are not authorized"});
    }
    res.status(200).json({Message: "Category updated", category: result.rows[0]});
  } catch (error) {
    console.error(error);
    res.status(500).json({Message: error.message});
  }
};

export const deleteCategoryOnControllers = async (req, res) => {
  const userId = req.user.id;
  const {categoryId} = req.params;

  try {
    const result = await deleteCategoryById(categoryId, userId);
    if (result.rowCount === 0) {
      return res.status(404).json({Message: "Category not found or you are not authorized"});
    }
    res.status(200).json({Message: "Category deleted", category: result.rows[0]});
  } catch (error) {
    console.error(error);
    res.status(500).json({Message: error.message});
  }
};