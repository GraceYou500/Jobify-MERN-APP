import { UnauthenticatedError } from '../errors/index.js';
import jwt from 'jsonwebtoken';
const auth = async (req, res, next) => {
  const authHeader = req.headers.authorization;

  console.log('req...........', req);

  if (!authHeader || !authHeader.startsWith('Bearer')) {
    throw new UnauthenticatedError('Authentication invalid');
  }

  const token = authHeader.split(' ')[1];
  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET);

    req.user = { userId: payload.userId };

    // console.log(authHeader);
    // console.log('token...........', token);
    // console.log('payload...........', payload);
    // console.log('req.user...........', req.user);
    next(); // next middleware will pass to updateUser controller automativelly.
  } catch (error) {
    throw new UnauthenticatedError('Authentication invalid');
  }
};

export default auth;
