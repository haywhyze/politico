import { Router } from 'express';
import isEmpty from '../middlewares/isEmpty';
import validateName from '../middlewares/validateName';
import validateHqAddress from '../middlewares/validateHqAddress';
import PartyController from '../controllers/parties';
import uploadlogo from '../middlewares/uploadLogo';

const router = Router();

router.post(
  '/parties',
  uploadlogo,
  isEmpty,
  validateName,
  validateHqAddress,
  PartyController.create,
);

router.get('/parties', PartyController.getAll);

export default router;
