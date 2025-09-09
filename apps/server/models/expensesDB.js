import {connection} from "./connectionToDB.js";

export const insertExpense = async (amount, date, description = null, reccuring = false, startDate = null, endDate = null, receiptUpload = null, userId) => {
  const sqlQuery = {
    text: `INSERT INTO expenses (amount, date, description, reccuring, start_date, end_date, receipt_upload, user_id)
           VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING *`,
    values: [amount, date, description, reccuring, startDate, endDate, receiptUpload, userId]
  };
  return connection.query(sqlQuery);
};

export const findUserExpenses = async (
  userId,
  startDate = null,
  endDate = null,
  reccuring = null
) => {
  let query = `
    SELECT id, amount, date, description, reccuring, receipt_upload, creation_date, start_date, end_date, user_id
    FROM expenses
    WHERE user_id = $1
  `;

  const values = [userId];
  let index = 2;

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

  if (reccuring !== null && reccuring !== undefined) {
    const boolValue = reccuring === true || reccuring === "true";
    query += ` AND reccuring = $${index}`;
    values.push(boolValue);
    index++;
  }

  return connection.query({ text: query, values });
};



export const findExpenseById = (id) => {
  return connection.query({
    text: `SELECT id, amount, date, description, reccuring, receipt_upload, creation_date, start_date, end_date, user_id
           FROM expenses
           WHERE id = $1`,
    values: [id]
  });
};

export const deleteExpenseById = (id) => {
  return connection.query({
    text: `DELETE
           FROM expenses
           WHERE id = $1`,
    values: [id]
  });
};

export const updateExpense = async (id, fields) => {
  const keys = Object.keys(fields).filter(
    (k) => fields[k] !== undefined && fields[k] !== null
  );

  if (keys.length === 0) throw new Error("No fields to update");

  const sets = keys.map((k, i) => `${k} = $${i + 1}`).join(" , ");
  const values = keys.map((k) => fields[k]);

  const query = `
    UPDATE expenses
    SET ${sets} 
    WHERE id = $${keys.length + 1} 
    RETURNING *`;

  return connection.query({ text: query, values: [...values, id] });
};