import {Router} from 'express';
import AuthController from '../controllers/AuthController';
import Auth from "../middlewares/Auth";
import Car from "../middlewares/Car";
import CarController from "../controllers/CarController";
import CarOwner from "../middlewares/CarOwner";
import Upload from "../middlewares/Upload";

const router = Router();

router.get('/', CarController.getCars);
router.get('/:carId', Car, CarController.getCarDetails);

router.use(Auth);
router.post('/', CarController.createCar);
router.put('/:carId', Car, CarOwner, CarController.updateCar);
router.patch('/:carId/details', Car, CarOwner, CarController.setCarDetails);
router.patch('/:carId/features', Car, CarOwner, CarController.setCarFeature);
router.patch('/:carId/pictures', Car, CarOwner, Upload.single('image'), CarController.setCarPicture);

export default router;
