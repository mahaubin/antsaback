import express from 'express';
import {
  login,
  register,
  loggedInAdmin,
  loggedInClient,
  logoutAdmin,
  logoutClient,
} from '../controller/auth.js';

const router = express.Router();

router.post('/register', register);
router.post('/login', login);
router.get('/logoutAdmin', logoutAdmin);
router.get('/logoutClient', logoutClient);
router.get('/loggedInAdmin', loggedInAdmin);
router.get('/loggedInClient', loggedInClient);

export default router;
