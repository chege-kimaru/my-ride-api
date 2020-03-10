import { Router } from 'express';
import AuthController from '../controllers/AuthController';
import Auth from "../middlewares/Auth";
const router = Router();

router.post('/signin', AuthController.googleSignIn);

export default router;
