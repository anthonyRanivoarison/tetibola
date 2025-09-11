import express from "express";
import { getProfile, updateProfile, createProfile } from "../controllers/profileController.js";
import { verifyAuthToken } from "../controllers/authControllers.js";

const profileRouter = express.Router();


profileRouter.get("/", verifyAuthToken, getProfile);
profileRouter.post("/", verifyAuthToken, createProfile);
profileRouter.put("/", verifyAuthToken, updateProfile);

export default profileRouter;
