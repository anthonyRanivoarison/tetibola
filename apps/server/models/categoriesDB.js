import {connection} from "./connectionToDB.js";

export const getAllCategory = (userId) => {
  const sqlQuery = {
    text: `
      SELECT c.id, c.name, c.is_active
      FROM category c
      JOIN expenses e ON c.expense_id = e.id
      WHERE e.user_id = $1
    `,
    values: [userId],
  };
  return connection.query(sqlQuery);
};

export const insertCategory = (name, expenseId) => {
  const sqlQuery = {
    text: `
      INSERT INTO category (name, is_active, expense_id)
      VALUES ($1, true, $2)
      RETURNING *
    `,
    values: [name, expenseId],
  };
  return connection.query(sqlQuery);
};

// export const updateCategoryById = (categoryId, userId, name) => {
//   const sqlQuery = {
//     text: `
//       UPDATE category c
//       SET name = $1
//       FROM expenses e
//       WHERE c.expense_id = e.id AND e.user_id = $2 AND c.id = $3
//       RETURNING c.*
//     `,
//     values: [name, userId, categoryId],
//   };
//   return connection.query(sqlQuery);
// };

// export const deleteCategoryById = (categoryId, userId) => {
//   const sqlQuery = {
//     text: `
//       DELETE FROM category c
//       USING expenses e
//       WHERE c.expense_id = e.id AND e.user_id = $1 AND c.id = $2
//       RETURNING c.*
//     `,
//     values: [userId, categoryId],
//   };
//   return connection.query(sqlQuery);
// };
