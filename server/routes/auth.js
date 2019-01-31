import { Router } from 'express';
import uploadPassport from '../middlewares/uploadPassport';
import isEmpty from '../middlewares/isEmpty';
import emailExist from '../middlewares/emailExist';
import UserController from '../controllers/users';
import validateUserInput from '../middlewares/validateUserInput';

const auth = Router();

auth.post('/signup', uploadPassport, isEmpty, validateUserInput, emailExist, UserController.create);
auth.post('/login', UserController.login);

export default auth;
