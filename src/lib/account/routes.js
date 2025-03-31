import { Router } from 'express';
import { createAccount } from '../account/controller/register.controller.js';
import { validateRequest } from '../../utils/joi.Validation.js';
import { userSchema } from '../utils/schema/account.schema.js';
import multer from 'multer';
import { loginAccount } from './controller/login.controller.js';
const upload = multer({ dest: 'uploads/' });
const router = Router();
router.post(
  '/',
  upload.single('profilePhoto'),
  validateRequest(userSchema),
  createAccount
);
router.post('/login', loginAccount);
export default router;
