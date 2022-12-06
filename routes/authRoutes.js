import express from 'express';
const router = express.Router();
import authenticateUser from '../middleware/auth.js';
import testUser from '../middleware/testUser.js';
import {
  register,
  login,
  updateUser,
  getCurrentUser,
} from '../controllers/authController.js';
import rateLimiter from 'express-rate-limit';

const apiLimiter = rateLimiter({
  windowMs: 15 * 60 * 1000, // 15 mins
  max: 10, // 10 times
  message:
    'Too many request from this IP address, please try again after 15 mins',
});

router.route('/register').post(apiLimiter, register);
router.route('/login').post(apiLimiter, login);
router.route('/updateUser').patch(authenticateUser, testUser, updateUser);
router.route('/getCurrentUser').get(authenticateUser, getCurrentUser);

export default router;
