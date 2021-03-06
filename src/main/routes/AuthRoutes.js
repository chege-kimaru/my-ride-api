import { Router } from 'express';
import AuthController from '../controllers/AuthController';
import Auth from "../middlewares/Auth";
const router = Router();

router.post('/signin', AuthController.googleSignIn);
router.get('/', Auth, AuthController.getAccountDetails);

export default router;
