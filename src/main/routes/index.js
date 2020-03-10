import { Router } from 'express';
import AuthRoutes from './AuthRoutes';

const router = Router();

router.use('/auth', AuthRoutes);

export default router;
