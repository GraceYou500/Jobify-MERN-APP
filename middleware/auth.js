import { UnauthenticatedError } from '../errors/index.js';
import jwt from 'jsonwebtoken';
const auth = async (req, res, next) => {
  // console.log('req...........', req.cookies);

  const token = req.cookies.token;

  if (!token) {
    throw new UnauthenticatedError('Authentication invalid');
  }

  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET);

    const testUser = payload.userId === '638da6824dc1c9bfe4a6dcfa';
    req.user = { userId: payload.userId, testUser };
    // console.log('payload...........', payload);

    next(); // next middleware will pass to updateUser controller automativelly.
  } catch (error) {
    throw new UnauthenticatedError('Authentication invalid');
  }
};

export default auth;
