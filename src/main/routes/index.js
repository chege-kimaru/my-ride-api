import {Router} from 'express';
import AuthRoutes from './AuthRoutes';
import CarRoutes from './CarRoutes';
import CarMakeRoutes from './CarMakeRoutes';
import UserRoutes from './UserRoutes';

const router = Router();

router.use('/auth', AuthRoutes);
router.use('/cars', CarRoutes);
router.use('/car-makes', CarMakeRoutes);
router.use('/users', UserRoutes);

export default router;
