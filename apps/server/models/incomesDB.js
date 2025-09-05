import {connection} from "./connectionToDB.js";

export const insertUserIncomes = async (amount, date = null, source, description = null, userId) => {
    try {
        const sqlQuery = {
            text: 'INSERT INTO incomes(amount, date, source, description, user_id) VALUES($1, $2, $3, $4, $5)',
            values: [amount, date, source, description, userId]
        }
        return connection.query(sqlQuery);
    } catch (err) {
        console.log(err);
        throw err;
    }
}

export const findUserIncomes = async (startDate = null, endDate = null) => {
    try{
        if (startDate === null && endDate === null) {
            const sqlQuery = 'SELECT id, amount, date, source, description, creation_date FROM incomes'
            return connection.query(sqlQuery);
        }
        if (endDate == null) {
            const sqlQuery = {
                text: 'SELECT id, amount, date, source, description, creation_date FROM incomes WHERE date >= $1',
                values: [startDate]
            }
            return connection.query(sqlQuery);
        }
        if (startDate == null) {
            const sqlQuery = {
                text: 'SELECT id, amount, date, source, description, creation_date FROM incomes WHERE date <= $1',
                values: [endDate]
            }
            return connection.query(sqlQuery);
        }
        else {
            const sqlQuery = {
                text: 'SELECT id, amount, date, source, description, creation_date FROM incomes WHERE date >= $1 and date <= $2',
                values: [startDate, endDate]
            }
            return connection.query(sqlQuery);
        }
    }
    catch (err){
        console.log(err);
        throw err;
    }
}

export const findUserIncomesById = (Id) => {
    const sqlQuery = {
        text: 'SELECT amount, date, source, description, creation_date FROM incomes WHERE id = $1',
        values: [Id]
    }
    return connection.query(sqlQuery);
}