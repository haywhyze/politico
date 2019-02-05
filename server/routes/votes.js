import { Router } from 'express';
import isEmpty from '../middlewares/isEmpty';
import verifyToken from '../middlewares/verifyToken';
import validateInput from '../middlewares/validateInput';
import VoteController from '../controllers/votes';

const vote = Router();

vote.post('/', verifyToken, isEmpty, validateInput, VoteController.vote);

export default vote;
