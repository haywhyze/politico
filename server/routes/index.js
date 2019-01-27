import { Router } from 'express';
import isEmpty from '../middlewares/isEmpty';
import validateName from '../middlewares/validateName';
import validateHqAddress from '../middlewares/validateHqAddress';
import validateID from '../middlewares/validateID';
import validateType from '../middlewares/validateType';
import validateOfficeName from '../middlewares/validOfficeName';
import PartyController from '../controllers/parties';
import uploadlogo from '../middlewares/uploadLogo';
import OfficeContrller from '../controllers/offices';

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
router.delete('/parties/:id', validateID, PartyController.delete);

// office routes
router.post('/offices', isEmpty, validateType, validateOfficeName, OfficeContrller.create);
export default router;
