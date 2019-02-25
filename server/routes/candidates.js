import { Router } from 'express';
import verifyToken from '../middlewares/verifyToken';
import CandidateController from '../controllers/candidates';
import justAdmin from '../middlewares/justAdmin';

const candidates = Router();

candidates.get('/', verifyToken, justAdmin, CandidateController.getAll);

export default candidates;
