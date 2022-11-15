import User from '../models/User.js';
import { StatusCodes } from 'http-status-codes';

class CustomAPIError extends Error {
  constructor(message) {
    super(message);
  }
}

class BadRequestError extends CustomAPIError {
  constructor(message) {
    super(message);
    this.statusCode = StatusCodes.BAD_REQUEST;
  }
}

class NotFoundError extends CustomAPIError {
  constructor(message) {
    super(message);
    this.statusCode = StatusCodes.NOT_FOUND;
  }
}

const register = async (req, res) => {
  const { name, email, password } = req.body;
  if (!name || !email || !password) {
    throw new BadRequestError('Please provide all values.');
  }
  const user = await User.create({ name, email, password });
  res.status(StatusCodes.CREATED).json({ user });
  // next middleware will log the error to errorHandlerMiddleware. But with express-async-errors package, we don't need try catch and don't need next to pass the error, it will automatively pass to error handler middleware.
};

const login = async (req, res) => {
  res.send('login user');
};

const updateUser = async (req, res) => {
  res.send('updateUser');
};

export { register, login, updateUser };
