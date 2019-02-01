import { Router } from 'express';
import isEmpty from '../middlewares/isEmpty';
import validateHqAddress from '../middlewares/validateHqAddress';
import validateName from '../middlewares/validateName';
import uploadlogo from '../middlewares/uploadLogo';
import partySymbolExists from '../middlewares/partySymbolExists';
import PartyController from '../controllers/parties';
import verifyToken from '../middlewares/verifyToken';
import justAdmin from '../middlewares/justAdmin';

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
  PartyController.create,
);

export default parties;
