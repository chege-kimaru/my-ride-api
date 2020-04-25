import {Router} from 'express';
import Auth from "../middlewares/Auth";
import UserController from "../controllers/UserController";
import HireController from "../controllers/HireController";
import CarController from "../controllers/CarController";

const router = Router();

router.use(Auth);
router.put('/', UserController.setUser);
router.get('/', UserController.getAccountDetails);

router.get('/me/hires', HireController.getUserHires);
router.get('/me/cars', CarController.getUserCars);

export default router;
