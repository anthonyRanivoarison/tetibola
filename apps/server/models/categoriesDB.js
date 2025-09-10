import {connection} from "./connectionToDB.js";

export const getAllCategory = (userId) => {
    try{
        const sqlQuery = {
            text: 'SELECT id, name, is_active FROM category WHERE user_id = $1',
            values: [userId]
        }
        return connection.query(sqlQuery);
    }
    catch(error){
        console.error(error);
        throw error;
    }
}

export const insertCategory = (categoryName, userId) => {
    try{
        const sqlQuery = {
            text: 'INSERT INTO category (name, user_id) VALUES ($1, $2)',
            values: [categoryName, userId]
        }
        return connection.query(sqlQuery);
    }
    catch(error){
        console.error(error);
        throw error;
    }
}

export const updateCategoryById = (categoryId, userId, name) => {
    try{
        const sqlQuery = {
            text: 'UPDATE category SET name = $1 WHERE user_id = $2 AND id = $3',
            values: [name, userId, categoryId]
        }
        return connection.query(sqlQuery);
    }
    catch(error){
        console.error(error);
        throw error;
    }
}

export const deleteCategory = (userId, categoryId) => {
    try{
        const sqlQuery = {
            text: 'DELETE FROM category WHERE user_id = $1 AND id = $2',
            values: [userId, categoryId]
        }
        return connection.query(sqlQuery);
    }
    catch(error){
        console.error(error);
        throw error;
    }
}
