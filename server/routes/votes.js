import { Router } from 'express';
import isEmpty from '../middlewares/isEmpty';
import verifyToken from '../middlewares/verifyToken';
import validateVoteInput from '../middlewares/validateVoteInput';
import VoteController from '../controllers/votes';

const vote = Router();

vote.post('/', verifyToken, isEmpty, validateVoteInput, VoteController.vote);

export default vote;
