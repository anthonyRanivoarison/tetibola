import express from "express";
import { getProfile, updateProfile } from "../controllers/profileController.js";
import { verifyAuthToken } from "../controllers/authControllers.js";

const profileRouter = express.Router();


router.get("/", verifyAuthToken, getProfile);
router.put("/", verifyAuthToken, updateProfile);

export default profileRouter;
