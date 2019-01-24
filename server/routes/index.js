import { Router } from 'express';
import isEmpty from '../middlewares/isEmpty';
import PartyController from '../controllers/parties';

const router = Router();

router.post('/parties', isEmpty, PartyController.create);

export default router;
