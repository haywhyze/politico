import { Router } from 'express';
import isEmpty from '../middlewares/isEmpty';
import validateType from '../middlewares/validateType';
import validateOfficeName from '../middlewares/validOfficeName';
import OfficeContrller from '../controllers/offices';
import verifyToken from '../middlewares/verifyToken';
import justAdmin from '../middlewares/justAdmin';
import officeExists from '../middlewares/officeExists';
import validateID from '../middlewares/validateID';

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

office.get('/', verifyToken, OfficeContrller.getAll);
office.get('/:id', verifyToken, validateID, OfficeContrller.getOne);

export default office;
