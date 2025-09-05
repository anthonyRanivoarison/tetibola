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

export const deleteById = (Id) => {
    const sqlQuery = {
        text: 'DELETE FROM incomes WHERE id = $1',
        values: [Id]
    }
    return connection.query(sqlQuery);
}

export const updateData = (date = null, amount = null, source = null, description = null, id) => {
    let query = 'UPDATE incomes SET ';
    let sets = [];
    let values = [];
    let index = 1;

    if (date !== null) {
        sets.push(`date = $${index}`);
        values.push(date);
        index++;
    }

    if (source !== null) {
        sets.push(`source = $${index}`);
        values.push(source);
        index++;
    }

    if (description !== null) {
        sets.push(`description = $${index}`);
        values.push(description);
        index++;
    }

    if (amount !== null) {
        sets.push(`amount = $${index}`);
        values.push(amount);
        index++;
    }

    if (sets.length === 0) {
        throw new Error("Aucun champ à mettre à jour");
    }

    query += sets.join(", ") + ` WHERE id = $${index}`;
    values.push(id);

    const sqlQuery = {
        text: query,
        values
    };

    return connection.query(sqlQuery);
}