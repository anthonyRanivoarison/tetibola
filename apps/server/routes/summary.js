import { Router } from "express";
import {verifyAuthToken} from "../controllers/authControllers.js";
import {getAlert, getCustomRangeSummary, getMonthlySummary} from "../controllers/summaryControllers.js";
const summaryRouter = Router();

summaryRouter.get('/monthly', verifyAuthToken, getMonthlySummary);// get current month summary
summaryRouter.get('/', verifyAuthToken, getCustomRangeSummary); // get summary for custom range
summaryRouter.get('/alert', verifyAuthToken, getAlert); // budget overrun alert


export default summaryRouter;