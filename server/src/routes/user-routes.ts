import { Router } from 'express';
import UserController from '../controllers/user-controller';
import passport from 'passport';

const router = Router();

router.post('/register', UserController.register);
router.post('/login', UserController.login);

router.post(
  '/google',
  UserController.googleLogin 
);

export default router;
