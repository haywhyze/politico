import { Router } from 'express';
import parties from './parties';
import offices from './offices';
import auth from './auth';

const router = Router();

router.use('/parties', parties);
router.use('/offices', offices);
router.use('/auth', auth);

export default router;
