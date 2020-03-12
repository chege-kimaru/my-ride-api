import {Router} from 'express';
import Auth from "../middlewares/Auth";
import UserController from "../controllers/UserController";

const router = Router();

router.use(Auth);
router.put('/', UserController.setUser);
router.get('/', UserController.getAccountDetails);

export default router;
