import { Router } from 'express';
import contactsRouter from './contactsRoutes.js';
import authRouter from './auth.js';

const router = Router();

router.use('/contacts', contactsRouter);
router.use('/auth', authRouter);

export default router;
