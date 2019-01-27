import { Router } from 'express';
import isEmpty from '../middlewares/isEmpty';
import validateName from '../middlewares/validateName';
import validateHqAddress from '../middlewares/validateHqAddress';
import validateID from '../middlewares/validateID';
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
router.get('/parties/:id', validateID, PartyController.getOne);
router.patch('/parties/:id/name', validateID, isEmpty, validateName, PartyController.patchName);

export default router;
