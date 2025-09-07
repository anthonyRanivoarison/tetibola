import { connection } from "./connectionToDB.js";

export const insertExpense = async (amount, date, description = null, reccuring = false, startDate = null, endDate = null, receiptUpload = null, userId) => {
  const sqlQuery = {
    text: `INSERT INTO expense (amount, date, description, reccuring, start_date, end_date, receipt_upload, user_id)
           VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING *`,
    values: [amount, date, description, reccuring, startDate, endDate, receiptUpload, userId]
  };
  return connection.query(sqlQuery);
};

export const findUserExpenses = async (startDate = null, endDate = null, reccuring = null) => {
  let query = `SELECT id, amount, date, description, reccuring, receipt_upload, creation_date, start_date, end_date, user_id 
               FROM expense WHERE 1=1`;
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
  if (reccuring !== null) {
    query += ` AND reccuring = $${index}`;
    values.push(reccuring);
    index++;
  }

  return connection.query({ text: query, values });
};

export const findExpenseById = (id) => {
  return connection.query({
    text: `SELECT id, amount, date, description, reccuring, receipt_upload, creation_date, start_date, end_date, user_id
           FROM expense WHERE id = $1`,
    values: [id]
  });
};

export const deleteExpenseById = (id) => {
  return connection.query({
    text: `DELETE FROM expense WHERE id = $1`,
    values: [id]
  });
};

export const updateExpense = (id, fields) => {
  let query = "UPDATE expense SET ";
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
