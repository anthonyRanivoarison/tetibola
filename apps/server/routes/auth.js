import { Router } from "express";
const authRouter = Router();
import { userCreation, verifyEmailOnSignIn, userAuth, verifyEmailOnLogIn } from "../controllers/authControllers.js";

authRouter.post('/signup', userCreation);

authRouter.post('/signup/verification', verifyEmailOnSignIn);

authRouter.post('/login', userAuth);

authRouter.post('/login/verification', verifyEmailOnLogIn);

export default authRouter;
