import { Router } from 'express';
import uploadPassport from '../middlewares/uploadPassport';
import isEmpty from '../middlewares/isEmpty';
import fieldExists from '../middlewares/fieldExists';
import UserController from '../controllers/users';
import validateUserInput from '../middlewares/validateUserInput';
import uploadToCloudinary from '../middlewares/uploadToCloudinary';

const auth = Router();

auth.post(
  '/signup',
  uploadPassport,
  isEmpty,
  validateUserInput,
  fieldExists,
  uploadToCloudinary,
  UserController.create,
);
auth.post('/login', UserController.login);

export default auth;
