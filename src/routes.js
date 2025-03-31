import { Router } from 'express';
import accountRoutes from '../src/lib/account/routes.js';

const router = Router();
router.use('/account', accountRoutes);

export default router;
