import User from '../models/User.js';
import { StatusCodes } from 'http-status-codes';
import {
  BadRequestError,
  NotFoundError,
  UnauthenticatedError,
} from '../errors/index.js';

const register = async (req, res) => {
  const { name, email, password } = req.body;
  console.log('register...........', name, email, password);
  if (!name || !email || !password) {
    throw new BadRequestError('Please provide all values.');
  }

  const userAlreadyExists = await User.findOne({ email });

  if (userAlreadyExists) {
    throw new BadRequestError(
      'The email already in use, please provide a new email address.'
    );
  }

  const user = await User.create({ name, email, password });
  const token = user.createJWT();

  res.status(StatusCodes.CREATED).json({
    user: {
      email: user.email,
      lastName: user.lastName,
      location: user.location,
      name: user.name,
    },
    token,
    location: user.location,
  });
  // next middleware will log the error to errorHandlerMiddleware. But with express-async-errors package, we don't need try catch and don't need next to pass the error, it will automatively pass to error handler middleware.
};

const login = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    throw new BadRequestError('Please provide all values');
  }

  const user = await User.findOne({ email }).select('+password');

  // console.log('user........', user);
  if (!user) {
    throw new UnauthenticatedError('Unauthenticated!');
  }

  const isPasswordCorrect = await user.comparePassword(password);

  if (!isPasswordCorrect) {
    throw new UnauthenticatedError('Unauthenticated!');
  }

  const token = user.createJWT();
  user.password = undefined;

  res.status(StatusCodes.OK).json({
    token,
    user,
    location: user.location,
  });
};

const updateUser = async (req, res) => {
  console.log('updateUser =>req.user........', req.user);
  res.send('updateUser');
};

export { register, login, updateUser };
