import { Router } from 'express';
import isEmpty from '../middlewares/isEmpty';
import validateType from '../middlewares/validateType';
import validateOfficeName from '../middlewares/validOfficeName';
import validateID from '../middlewares/validateID';
import OfficeContrller from '../controllers/offices';

const office = Router();

office.post('/', isEmpty, validateType, validateOfficeName, OfficeContrller.create);
office.get('/', OfficeContrller.getAll);
office.get('/:id', validateID, OfficeContrller.getOne);

export default office;
