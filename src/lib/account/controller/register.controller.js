import logger from '../../../utils/logger.util.js';
import SendResponse from '../../../utils/sendResponse.js';
import { create } from '../../utils/create.js';
import { findOne } from '../../utils/findOne.js';
import Account from '../account.model.js';
import path from 'path';
import fs from 'fs';

export const createAccount = async (req, res) => {
  try {
    const { firstName, lastName, userName, email, password, phone } = req.body;
    // Check if the email already exists
    let exitingEmail = await findOne(Account, { email: email });
    if (exitingEmail) {
      return SendResponse(res, 409, false, `Already existing email address!`);
    }
    // Handle profile photo only if email does not exist
    let profilePhoto;
    if (req.file) {
      const fileExtension = path.extname(req.file.originalname);
      const newFileName = `${req.file.filename}${fileExtension}`;
      const newFilePath = path.join(req.file.destination, newFileName);
      fs.renameSync(req.file.path, newFilePath);
      profilePhoto = newFilePath;
    }
    // Create the user
    let createUser = await create(Account, {
      firstName,
      lastName,
      userName,
      email,
      password,
      phone,
      profilePhoto
    });
    return SendResponse(
      res,
      200,
      true,
      `Account created successfully!`,
      createUser
    );
  } catch (error) {
    logger.error(`Create account error`, error);
    return SendResponse(res, 500, false, `Internet server error `);
  }
};
