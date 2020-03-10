import {Router} from 'express';
import AuthController from '../controllers/AuthController';
import Auth from "../middlewares/Auth";
import CarMakeController from "../controllers/CarMakeController";

const router = Router();

router.post('/makes', CarMakeController.createMake);
router.get('/makes', CarMakeController.getMakes);
router.post('/makes/:makeId/models', CarMakeController.createModel);
router.get('/makes/:makeId/models', CarMakeController.getModels);
router.post('/models/:modelId/series', CarMakeController.createSeries);
router.get('/models/:modelId/series', CarMakeController.getSeries);

export default router;
