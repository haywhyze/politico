import { Router } from 'express';
import offices from './offices';
import parties from './parties';

const router = Router();

router.use('/parties', parties);
router.use('/offices', offices);

export default router;
