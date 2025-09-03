import { Router } from "express";
const authRouter = Router();
import { userCreation, verifyEmail } from "../controllers/authControllers.js";

authRouter.post('/signup', userCreation);

authRouter.post('/signup/verification', verifyEmail);

//authRouter.post('/login', userAuth);

//authRouter.post('/login/verification', verifyEmailOnLogin);

// authRouter.get('/me', getUserProfile); // user profile

export default authRouter;
