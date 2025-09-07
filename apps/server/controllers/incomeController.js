import {insertUserIncomes, findUserIncomes, findUserIncomesById, updateData, deleteById } from "../models/incomesDB.js";


const validAndSanitizeDate = (date) => {
    if (!/^[\d-]+$/.test(date) || !/^\d{4}-\d{2}-\d{2}$/.test(date)) {
        return { Message: 'Invalid date format.' };
    }
    return null;
}

export const postIncomes = async (req, res) => {
    const { amount, date, source, description } = req.body;

    if (!amount || !source || !date){
        return res.status(400).send({ Message: 'amount, date and source fields are required' });
    }
    if (amount < 1 || !/[0-9]/.test(amount)){
        return res.status(400).send({ Message: 'Invalid amount' });
    }
    if (!/^[\w;,-:. ]+$/.test(source) || !/^[\w;,-:. ]+$/.test(description)){
        return res.status(400).send({ Message: 'The description or source field cannot contain other special characters than ,.:;-' });
    }

    const invalidDate = validAndSanitizeDate(date);
    if (invalidDate){
        return res.status(400).send(invalidDate);
    }
    try{
        await insertUserIncomes(amount, date, source, description, req.user.id);
        return res.status(201).send({ Message: 'Data created' });
    }
    catch (error) {
        console.error(error);
        return res.status(500).send({ Message: 'Something went wrong, please try again later' });
    }
}

export const getIncomes = async (req, res) => {
    const { startDate, endDate } = req.query;

    const invalidDate = validAndSanitizeDate(startDate || endDate);
    if (invalidDate){
        return res.status(400).send(invalidDate);
    }
    try {
        const result = await findUserIncomes(startDate, endDate);
        return res.status(200).send(result.rows);
    }
    catch (error) {
        console.error(error);
        return res.status(400).json({ Message: 'Please check the date parameter.' });
    }
}

const sanitizeId = (id) => {
    if (!/^[a-f\d\-]+$/.test(id)){
        return { Message: 'Invalid id' };
    }
    return null;
}

export const getIncomesById = async (req, res) => {
    const { id } = req.params;

    const invalidId = sanitizeId(id);
    if (invalidId){
        return res.status(400).send(invalidId);
    }

    try{
        const result = await findUserIncomesById(id);
        return res.status(200).send(result.rows);
    }
    catch (error) {
        console.error(error);
        return res.status(500).json({ Message: 'An error occurred please try again later' });
    }
}

export const putIncomesById = async (req, res) => {
    const { id } = req.params;
    const { amount, date, source, description } = req.body;

    const invalidId = sanitizeId(id);
    if (invalidId){
        return res.status(400).send(invalidId);
    }

    if ((source && !/^[\w;,-:. ]+$/.test(source)) || (description && !/^[\w;,-:. ]+$/.test(description))){
        return res.status(400).send({ Message: 'The description or source field cannot contain other special characters than ,.:;-' });
    }

    if (amount && (amount < 1 || !/[0-9]/.test(amount))){
        return res.status(400).send({ Message: 'Invalid amount' });
    }

    const invalidDate = validAndSanitizeDate(date);
    if (date && invalidDate){
        return res.status(400).send(invalidDate);
    }

    try{
        const dataUpdated = await updateData(date, amount, source, description, id);
        if (dataUpdated.rowCount !== 0){
            return res.status(200).send({ Message: `Data ${id} updated` });
        }
        return res.status(404).send({ Message: `Id not found` });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ Message: 'An error occurred please try again later' });
    }
}

export const deleteIncomesById = async (req, res) => {
    const { id } = req.params;

    const invalidId = sanitizeId(id);
    if (invalidId){
        return res.status(400).send({ Message: 'Invalid id' });
    }

    try{
        await deleteById(id);
        return res.status(200).send({ Message: `Income ${id} deleted` });
    }
    catch (error) {
        console.error(error);
        return res.status(500).json({ Message: 'An error occurred please try again later' });
    }
}