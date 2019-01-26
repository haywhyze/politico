import { Router } from 'express';
import parties from './parties';
import offices from './offices';

const router = Router();

router.use('/parties', parties);
router.use('/offices', offices);

export default router;
