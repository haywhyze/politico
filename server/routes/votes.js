import { Router } from 'express';
import isEmpty from '../middlewares/isEmpty';
import verifyToken from '../middlewares/verifyToken';
import validateInput from '../middlewares/validateInput';
import VoteController from '../controllers/votes';
import validateID from '../middlewares/validateID';

const vote = Router();

vote.post('/', verifyToken, isEmpty, validateInput, VoteController.vote);
vote.get('/:id', verifyToken, validateID, VoteController.getAllByUser);

export default vote;
