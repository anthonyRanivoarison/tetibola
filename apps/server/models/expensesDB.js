import { connection } from "./connectionToDB.js";

// INSERT
export const insertExpense = async (amount, date, categoryId, description = null, type, startDate = null, endDate = null, receiptPath = null, userId) => {
  const sqlQuery = {
    text: `INSERT INTO expenses (amount, date, category_id, description, type, start_date, end_date, receipt, user_id) 
           VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9) RETURNING *`,
    values: [amount, date, categoryId, description, type, startDate, endDate, receiptPath, userId]
  };
  return connection.query(sqlQuery);
};

// SELECT ALL (avec filtres optionnels)
export const findUserExpenses = async (startDate = null, endDate = null, category = null, type = null) => {
  let query = `SELECT id, amount, date, category_id, description, type, start_date, end_date, receipt, creation_date 
               FROM expenses WHERE 1=1`;
  const values = [];
  let index = 1;

  if (startDate) {
    query += ` AND date >= $${index}`;
    values.push(startDate);
    index++;
  }
  if (endDate) {
    query += ` AND date <= $${index}`;
    values.push(endDate);
    index++;
  }
  if (category) {
    query += ` AND category_id = $${index}`;
    values.push(category);
    index++;
  }
  if (type) {
    query += ` AND type = $${index}`;
    values.push(type);
    index++;
  }

  return connection.query({ text: query, values });
};

// SELECT ONE
export const findExpenseById = (id) => {
  return connection.query({
    text: `SELECT id, amount, date, category_id, description, type, start_date, end_date, receipt, creation_date 
           FROM expenses WHERE id = $1`,
    values: [id]
  });
};

// DELETE
export const deleteExpenseById = (id) => {
  return connection.query({
    text: `DELETE FROM expenses WHERE id = $1`,
    values: [id]
  });
};

// UPDATE
export const updateExpense = (id, fields) => {
  let query = "UPDATE expenses SET ";
  let sets = [];
  let values = [];
  let index = 1;

  for (const key in fields) {
    if (fields[key] !== undefined && fields[key] !== null) {
      sets.push(`${key} = $${index}`);
      values.push(fields[key]);
      index++;
    }
  }

  if (sets.length === 0) throw new Error("Aucun champ à mettre à jour");

  query += sets.join(", ") + ` WHERE id = $${index} RETURNING *`;
  values.push(id);

  return connection.query({ text: query, values });
};
