import express from "express";
import { getProfile, updateProfile, createProfile } from "../controllers/profileController.js";
import { verifyAuthToken } from "../controllers/authControllers.js";

const profileRouter = express.Router();


router.get("/", verifyAuthToken, getProfile);
router.post("/", verifyAuthToken, createProfile);
router.put("/", verifyAuthToken, updateProfile);

export default profileRouter;
