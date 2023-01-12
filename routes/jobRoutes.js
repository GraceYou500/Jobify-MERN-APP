import express from 'express';
const router = express.Router();

import {
  getAllJobs,
  createJob,
  deleteJob,
  updateJob,
  showStats,
} from '../controllers/jobsController.js';
import testUser from '../middleware/testUser.js';

router.route('/').get(getAllJobs).post(testUser, createJob);
router.route('/stats').get(showStats);

router.route('/:id').delete(testUser, deleteJob).patch(testUser, updateJob);

export default router;
