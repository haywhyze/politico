import { Router } from 'express';
import isEmpty from '../middlewares/isEmpty';
import validateHqAddress from '../middlewares/validateHqAddress';
import validateName from '../middlewares/validateName';
import validateID from '../middlewares/validateID';
import uploadlogo from '../middlewares/uploadLogo';
import partySymbolExists from '../middlewares/partySymbolExists';
import PartyController from '../controllers/parties';
import verifyToken from '../middlewares/verifyToken';
import justAdmin from '../middlewares/justAdmin';
import uploadToCloudinary from '../middlewares/uploadToCloudinary';

const parties = Router();

parties.post(
  '/',
  verifyToken,
  justAdmin,
  uploadlogo,
  isEmpty,
  validateName,
  validateHqAddress,
  partySymbolExists,
  uploadToCloudinary,
  PartyController.create,
);

parties.get('/', verifyToken, PartyController.getAll);
parties.get('/:id', verifyToken, validateID, PartyController.getOne);
parties.patch(
  '/:id/name',
  verifyToken,
  justAdmin,
  validateID,
  isEmpty,
  validateName,
  partySymbolExists,
  PartyController.updateName,
);
parties.delete('/:id', verifyToken, justAdmin, validateID, PartyController.delete);

export default parties;
