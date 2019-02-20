import { Router } from 'express';
import parties from './parties';
import offices from './offices';
import auth from './auth';
import vote from './votes';
import candidates from './candidates';

const router = Router();

router.use('/parties', parties);
router.use('/offices', offices);
router.use('/auth', auth);
router.use('/vote', vote);
router.use('/candidates', candidates);

export default router;
