import { connection } from "./connectionToDB.js";


export const getUserProfile = async ({ userId }) => {
  try {
    const sqlQuery = {
      text: 'SELECT first_name, last_name FROM users WHERE id = $1',
      values: [userId],
    };

    const result = await connection.query(sqlQuery);
    return result.rows[0] || null;
    
  } catch (err) {
    
    console.log("Erreur to get user profil: ", err);
    throw err;
  }
};


export const createUserProfile = async ({ firstName, lastName, userId }) => {
  try {
    const sqlQuery = {
      text:       ` UPDATE users
                    SET first_name = $1,
                    last_name = $2
                    WHERE id = $3
                    RETURNING first_name, last_name`,
      values: [firstName, lastName, userId],
    };

    const result = await connection.query(sqlQuery);
    return result.rows[0] || null;
    
  } catch (err) {
    
    console.log("Erreur to create user profil: ", err);
    throw err;
  }
};


export const updateFirstName = async ({ firstName, userId }) => {
  try {
    const sqlQuery = {
      text:    `UPDATE users
                SET first_name = $1
                WHERE id = $2
                RETURNING first_name, last_name`,
      values: [firstName, userId],
    };
    
    const result = await connection.query(sqlQuery);
    return result.rows[0] || null;

  } catch (err) {

    console.log("Erreur to update first name: ", err);
    throw err;
  }
};


export const updateLastName = async ({ lastName, userId }) => {
  try {
    const sqlQuery = {
      text:        `UPDATE users
                    SET last_name = $1
                    WHERE id = $2
                    RETURNING first_name, last_name`,
      values: [lastName, userId],
    }; 

    const result = await connection.query(sqlQuery);
    return result.rows[0] || null;

  } catch (err) {

    console.log("Erreur to update last name: ", err);
    throw err;
  }
};
