import logger from '../../../utils/logger.util.js';
import SendResponse from '../../../utils/sendResponse.js';
import { create } from '../../utils/create.js';
import { findOne } from '../../utils/findOne.js';
import Account from '../account.model.js';

export const createAccount = async (req, res) => {
  try {
    const { firstName, lastName, userName, email, password, phone } = req.body;
    let profilePhoto = req.file ? req.file.path : null;
    console.log('req.file', req.file.originalname);

    let exitingEmail = await findOne(Account, { email: email });
    if (exitingEmail) {
      return SendResponse(res, 409, false, `Already exiting email address !`);
    }
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
