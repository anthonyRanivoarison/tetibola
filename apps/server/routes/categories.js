import { Router } from "express";
import {verifyAuthToken} from "../controllers/authControllers.js";
import {createCategory, deleteCategoryOnControllers, getCategories, putCategoryById} from "../controllers/categoryController.js";
const categoryRouter = Router();

categoryRouter.get('/', verifyAuthToken, getCategories); // list user categories
categoryRouter.post('/', verifyAuthToken, createCategory); // create new categories
categoryRouter.put('/:id', verifyAuthToken, putCategoryById); // rename category
categoryRouter.delete('/:id', verifyAuthToken, deleteCategoryOnControllers); // delete a category


export default categoryRouter;