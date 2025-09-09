import {connection} from "./connectionToDB.js";

export const getMonthlyIncomeSummary = (month, year, userId) => {
    try {
        const sqlQuery = {
            text: 'SELECT id, amount, source, description FROM incomes WHERE EXTRACT(year from date)::INT = $1 AND EXTRACT(month from date)::INT = $2 AND user_id = $3',
            values: [year, month, userId]
        }
        return connection.query(sqlQuery);
    } catch (err) {
        console.log(err);
        throw err;
    }
}

export const getSumMonthlyIncomeSummary = (month, year, userId) => {
    try {
        const sqlQuery = {
            text: 'SELECT SUM(amount) FROM incomes WHERE user_id = $1 AND EXTRACT(year from date)::int = $2 AND EXTRACT(month from date)::int = $3;',
            values: [userId, year, month]
        }
        return connection.query(sqlQuery);
    } catch (err) {
        console.log(err);
        throw err;
    }
}

export const getTotalMonthlyRecurringExpenseSummary = (month, year, userId) => {
    try {
        const sqlQuery = {
            text: 'SELECT SUM(amount) FROM expenses WHERE EXTRACT(year from start_date)::INT = $1 AND EXTRACT(month from start_date)::INT = $2 AND reccuring IS TRUE AND user_id = $3',
            values: [year, month, userId]
        }
        return connection.query(sqlQuery);
    } catch (err) {
        console.log(err);
        throw err;
    }
}

export const getAllMonthlyRecurringExpenseSummary = (userId) => {
    try {
        const sqlQuery = {
            text: 'SELECT id, amount, description, creation_date, start_date, end_date FROM expenses WHERE reccuring IS TRUE AND user_id = $1',
            values: [userId]
        }
        return connection.query(sqlQuery);
    } catch (err) {
        console.log(err);
        throw err;
    }
}

export const getTotalMonthlyNotRecurringExpenseSummary = (month, year, userId) => {
    try {
        const sqlQuery = {
            text: 'SELECT SUM(amount) FROM expenses WHERE EXTRACT(year from date)::INT = $1 and EXTRACT(month from date)::INT = $2 AND reccuring IS FALSE AND user_id = $3',
            values: [year, month, userId]
        }
        return connection.query(sqlQuery);
    } catch (err) {
        console.log(err);
        throw err;
    }
}

export const getAllNotRecurringExpenseSummary = (userId) => {
    try {
        const sqlQuery = {
            text: 'SELECT id, amount, date, description, creation_date FROM expenses WHERE reccuring IS FALSE AND user_id = $1',
            values: [userId]
        }
        return connection.query(sqlQuery);
    } catch (err) {
        console.log(err);
        throw err;
    }
}

const getAllSummaryCustomRange = (startDate = null, endDate = null, userId, tableName, columnName) => {
    try {
        let query = `SELECT id, amount, date, ${columnName}, description, creation_date FROM ${tableName} WHERE user_id = $1`;
        let sets = [];
        let values = [userId];
        let index = 2;

        if (startDate !== null) {
            sets.push(` AND date >= $${index}`);
            values.push(startDate);
            index++;
        }

        if (endDate !== null) {
            sets.push(` AND date <= $${index}`);
            values.push(endDate);
            index++;
        }
        query += sets.join("");

        const sqlQuery = {
            text: query,
            values
        };
        return connection.query(sqlQuery);
    } catch (err) {
        console.log(err);
        throw err;
    }
}

export const getAllIncomesSummaryCustomRange = async (startDate = null, endDate = null, userId) => {
    try {
        return await getAllSummaryCustomRange(startDate, endDate, userId, 'incomes', 'source');
    } catch (err) {
        console.log(err);
        throw err;
    }
}

export const getAllExpensesSummaryCustomRange = async (startDate = null, endDate = null, userId) => {
    try {
        return await getAllSummaryCustomRange(startDate, endDate, userId, 'expenses', 'reccuring, receipt_upload, start_date, end_date');
    } catch (err) {
        console.log(err);
        throw err;
    }
}
