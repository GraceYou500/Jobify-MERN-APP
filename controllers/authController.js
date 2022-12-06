import User from '../models/User.js';
import { StatusCodes } from 'http-status-codes';
import {
  BadRequestError,
  NotFoundError,
  UnauthenticatedError,
} from '../errors/index.js';
import attachCookies from '../utils/attachCookies.js';

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

  attachCookies({ res, token }); // we attach the cookie to the response automatively, and everytime the browser make request to the server, it  will auto include the token cookie in the request

  res.status(StatusCodes.CREATED).json({
    user: {
      email: user.email,
      lastName: user.lastName,
      location: user.location,
      name: user.name,
    },

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

  attachCookies({ res, token });

  res.status(StatusCodes.OK).json({
    user,
    location: user.location,
  });
};

const updateUser = async (req, res) => {
  const { email, name, location, lastName } = req.body;

  if (!name || !email || !location || !lastName) {
    throw new UnauthenticatedError('Please provide all values');
  }

  const user = await User.findOne({ _id: req.user.userId });

  user.name = name;
  user.email = email;
  user.location = location;
  user.lastName = lastName;

  await user.save();

  const token = user.createJWT();
  attachCookies({ res, token });
  res.status(StatusCodes.OK).json({ user, location: user.location });
};

const getCurrentUser = async (req, res) => {
  const user = await User.findOne({ _id: req.user.userId });
  res.status(StatusCodes.OK).json({ user, location: user.location });
};

export { register, login, updateUser, getCurrentUser };
