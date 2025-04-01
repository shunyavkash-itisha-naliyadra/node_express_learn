import logger from '../../../utils/logger.util.js';
import SendResponse from '../../../utils/sendResponse.js';
import { create } from '../../utils/create.js';
import { findOne } from '../../utils/findOne.js';
import Account from '../account.model.js';
import path from 'path';
import fs from 'fs';
import { updatedById } from '../../utils/updatedById.js';
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
export const getAllAccount = async (req, res) => {
  try {
    const { filter = {}, search = '', limit = 10, page = 1 } = req.body;
    const validatedLimit = Math.max(1, parseInt(limit));
    const validatedPage = Math.max(1, parseInt(page));
    const query = { ...filter };
    if (search) {
      query.$or = [
        { firstName: { $regex: search, $options: 'i' } },
        { lastName: { $regex: search, $options: 'i' } },
        { email: { $regex: search, $options: 'i' } },
        { userName: { $regex: search, $options: 'i' } }
      ];
    }
    const accounts = await find(
      Account,
      query,
      Account,
      (validatedPage - 1) * validatedLimit
    );
    const totalDocuments = await Account.countDocuments(query);
    return SendResponse(res, 200, true, 'Accounts fetched successfully!', {
      accounts,
      totalDocuments,
      totalPages: Math.ceil(totalDocuments / validatedLimit),
      currentPage: validatedPage
    });
  } catch (error) {
    logger.error(`Get all accounts error`, error);
    return SendResponse(res, 500, false, `Internal server error`);
  }
};

export const updateAccount = async (req, res) => {
  try {
    const id = req.params.id;
    const { firstName, lastName, userName, email, password, profilePhoto } =
      req.body;
    if (req.file) {
      const existingAccount = await findOne(Account, { _id: id });
      if (existingAccount && existingAccount.profilePhoto) {
        fs.unlinkSync(existingAccount.profilePhoto);
      }
      const fileExtension = path.extname(req.file.originalname);
      const newFileName = `${req.file.filename}${fileExtension}`;
      const newFilePath = path.join(req.file.destination, newFileName);
      fs.renameSync(req.file.path, newFilePath);
      req.body.profilePhoto = newFilePath;
    }
    let updateAccount = await updatedById(Account, id, {
      firstName,
      lastName,
      userName,
      email,
      password,
      profilePhoto: req.body.profilePhoto
    });
    logger.info('data', updateAccount);
    return SendResponse(
      res,
      200,
      true,
      `Account updated successfully!`,
      updateAccount
    );
  } catch (error) {
    logger.error(`Create account error`, error);
    return SendResponse(res, 500, false, `Internet server error `);
  }
};
