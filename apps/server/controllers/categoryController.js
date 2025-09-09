import {deleteCategory, getAllCategory, insertCategory, updateCategoryById} from "../models/categoriesDB.js";

export const getCategory = async (req, res) => {
    const id = req.user.id;
    try{
        const category = await getAllCategory(id);
        return res.status(200).json({ categoryList: category.rows });
    }
    catch(error){
        res.status(500).json({ Message: 'An error occurred, please try again later' });
    }
}

const sanitizeAndValidInput = (input) => {
    if (!input) {
        return { Message: 'This field is required' };
    }
    if (input.length > 25){
        return { Message: 'Category name is too long' };
    }
    if (!/^[\w. ,]+$/.test(input)) {
        return { Message: 'Category name contains invalid character' };
    }
}

export const createCategory = async (req, res) => {
    const id = req.user.id;
    const { name } = req.body;

    const invalidName = sanitizeAndValidInput(name);
    if (invalidName){
        return res.status(400).json(invalidName);
    }

    try{
        const categoryExist = await getAllCategory(id);
        for (let category of categoryExist.rows){
            if (category.name === name){
                return res.status(409).json({ Message: 'Category already exists' });
            }
        }
        await insertCategory(name, id);
        res.status(201).json({ Message: 'Category created' });
    }
    catch(error){
        console.error(error);
        return res.status(500).json({ Message: 'An error occurred, please try again later' });
    }
}

export const putCategoryById = async (req, res) => { // not tested
    const id = req.user.id;
    const { name } = req.body;
    const { categoryId } = req.params;

    const invalidName = sanitizeAndValidInput(name);
    if (invalidName){
        return res.status(400).json(invalidName);
    }

    if (!/^[a-f\d\-]+$/.test(categoryId) || !categoryId){
        return { Message: 'Invalid id' };
    }

    try{
        const categoryExist = await getAllCategory(id);
        for (let category of categoryExist.rows){
            if (category.name === name){
                return res.status(409).json({ Message: 'Category already exists' });
            }
        }
        await updateCategoryById(categoryId, id, name);
        res.status(201).json({ Message: 'Category updated' });
    }
    catch(error){
        console.error(error);
        return res.status(500).json({ Message: 'An error occurred, please try again later' });
    }
}

export const deleteCategoryById = async (req, res) => { //not tested
    const id = req.user.id;
    const { categoryId } = req.params;

    if (!/^[a-f\d\-]+$/.test(categoryId) || !categoryId){
        return { Message: 'Invalid id' };
    }

    try{
        await deleteCategory(id, categoryId);
        return res.status(200).json({ Message: 'Category deleted' });
    }
    catch(error){
        console.error(error);
        return res.status(500).json({ Message: 'An error occurred, please try again later' });
    }
}