import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import { verifyToken } from '../utils/jwt.util.js';
dotenv.config();
const SECRET_KEY = process.env.JWT_SECRET;
export const authenticate = (req, res, next) => {
  const token = req?.cookies?.accessToken;
  console.log('token', token);
  if (!token) {
    return res
      .status(401)
      .json({ success: false, message: 'Access Denied: No Token Provided' });
  }
  try {
    const decoded = verifyToken(token, SECRET_KEY);
    req.user = decoded;
    next();
  } catch (error) {
    return res.status(401).json({ success: false, message: 'Invalid Token' });
  }
};
