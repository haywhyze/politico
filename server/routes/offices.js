import { Router } from 'express';
import isEmpty from '../middlewares/isEmpty';
import validateType from '../middlewares/validateType';
import validateOfficeName from '../middlewares/validOfficeName';
import OfficeContrller from '../controllers/offices';
import verifyToken from '../middlewares/verifyToken';
import justAdmin from '../middlewares/justAdmin';
import fieldExists from '../middlewares/fieldExists';
import validateID from '../middlewares/validateID';
import validateInput from '../middlewares/validateInput';
import candidateErrorHandler from '../middlewares/candidateErrorHandler';

const office = Router();

office.post(
  '/',
  verifyToken,
  justAdmin,
  isEmpty,
  validateType,
  validateOfficeName,
  fieldExists,
  OfficeContrller.create,
);

office.post(
  '/:id/register',
  verifyToken,
  justAdmin,
  isEmpty,
  validateID,
  validateInput,
  candidateErrorHandler,
  OfficeContrller.register,
);

office.get('/', verifyToken, OfficeContrller.getAll);
office.get('/:id', verifyToken, validateID, OfficeContrller.getOne);
office.get('/:id/results', verifyToken, validateID, OfficeContrller.results);
export default office;
