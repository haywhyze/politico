import { Router } from 'express';
import isEmpty from '../middlewares/isEmpty';
import validateName from '../middlewares/validateName';
import validateHqAddress from '../middlewares/validateHqAddress';
import uploadLogoToCloud from '../middlewares/uploadLogoToCloud';
import PartyController from '../controllers/parties';
import uploadlogo from '../middlewares/uploadLogo';

const router = Router();

router.post(
  '/parties',
  uploadlogo,
  uploadLogoToCloud,
  isEmpty,
  validateName,
  validateHqAddress,
  PartyController.create,
);

export default router;
