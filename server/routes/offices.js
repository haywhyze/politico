import { Router } from 'express';
import isEmpty from '../middlewares/isEmpty';
import validateType from '../middlewares/validateType';
import validateOfficeName from '../middlewares/validOfficeName';
import OfficeContrller from '../controllers/offices';
import verifyToken from '../middlewares/verifyToken';
import justAdmin from '../middlewares/justAdmin';
import officeExists from '../middlewares/officeExists';

const office = Router();

office.post(
  '/',
  verifyToken,
  justAdmin,
  isEmpty,
  validateType,
  validateOfficeName,
  officeExists,
  OfficeContrller.create,
);

export default office;
