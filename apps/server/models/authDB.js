import {connection} from "./connectionToDB.js";

export const insertUserData = (email, password) => {
    try{
        const sqlQuery = {
            text: 'INSERT INTO users(email, password) VALUES($1, $2)',
            values: [email, password]
        }
        return connection.query(sqlQuery);
    }
    catch(err){
        console.log(err);
        throw err;
    }
}

export const findUserEmail = async (email) => {
    try{
        const sqlQuery = {
            text: 'SELECT email FROM users WHERE email = $1',
            values: [email]
        }
        return connection.query(sqlQuery);
    }
    catch(err){
        console.log(err);
        throw err;
    }
}


export const findUserId = async (email) => {
    try{
        const sqlQuery = {
            text: 'SELECT id FROM users WHERE email = $1',
            values: [email]
        }
        return connection.query(sqlQuery);
    }
    catch(err){
        console.log(err);
        throw err;
    }
}

export const findUserEmailAndPassword = async (email) => {
    try{
        const sqlQuery = {
            text: 'SELECT email, password FROM users WHERE email = $1',
            values: [email]
        }
        return connection.query(sqlQuery);
    }
    catch(err){
        console.log(err);
        throw err;
    }
}