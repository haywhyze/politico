import { Router } from 'express';
import isEmpty from '../middlewares/isEmpty';
import validateHqAddress from '../middlewares/validateHqAddress';
import validateName from '../middlewares/validateName';
import validateID from '../middlewares/validateID';
import uploadlogo from '../middlewares/uploadLogo';
import PartyController from '../controllers/parties';

const parties = Router();

parties.post('/', uploadlogo, isEmpty, validateName, validateHqAddress, PartyController.create);
parties.get('/', PartyController.getAll);
parties.get('/:id', validateID, PartyController.getOne);
parties.patch('/:id/name', validateID, isEmpty, validateName, PartyController.patchName);
parties.delete('/:id', validateID, PartyController.delete);

export default parties;
