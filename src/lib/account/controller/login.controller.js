import bcrypt from 'bcrypt';
import SendResponse from '../../../utils/sendResponse.js';
import { findOne } from '../../utils/findOne.js';
import logger from '../../../utils/logger.util.js';
import Account from '../account.model.js';
import { generateToken } from '../../utils/generateToken.util.js';
import setCookie from '../../../utils/setCookies.js';
export const loginAccount = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email && !password) {
      return SendResponse(res, 400, false, `Email is required!`);
    }
    const user = await findOne(Account, { email });
    if (!user && !user._id) {
      return SendResponse(res, 401, false, 'Invalid email or password');
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return SendResponse(res, 401, false, 'Invalid password');
    }
    const token = await generateToken(user._id);
    const userObject = user.toObject();
    delete userObject.password;
    setCookie(res, 'accessToken', token, { maxAge: 15 * 60 * 1000 });
    return SendResponse(res, 200, true, 'Login successful', {
      token,
      user: userObject
    });
  } catch (error) {
    logger.log('Internal server error ', error);
    return SendResponse(res, 500, false, 'User login Error!');
  }
};
export const getAccount = async (req, res) => {
  console.log('he;lo');
};
