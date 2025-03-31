import { Router } from 'express';
import { createAccount } from '../account/controller/register.controller.js';
import { validateRequest } from '../../utils/joi.Validation.js';
import { userSchema } from '../utils/schema/account.schema.js';
import upload from '../../middleware/multer. storage.js';
const router = Router();
router.post('/', upload.single('profilePhoto'), createAccount);
export default router;
