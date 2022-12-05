import { BadRequestError } from '../errors/index.js';

const testUser = (req, res, next) => {
  const { testUser } = req.user;

  if (testUser) {
    throw new BadRequestError('Test User & Read Only!');
  }

  next();
};

export default testUser;
