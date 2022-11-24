import { UnauthenticatedError } from '../errors/index.js';

const checkPermissions = (requstUser, resourceUserId) => {
  if (requstUser.userId === resourceUserId.toString()) return;

  throw new UnauthenticatedError('Not authorized to access this route');
};

export default checkPermissions;
