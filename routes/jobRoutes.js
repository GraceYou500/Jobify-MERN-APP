import express from 'express';
const router = express.Router();

import {
  getAllJobs,
  createJob,
  deleteJob,
  updateJob,
  showStats,
} from '../controllers/jobsController.js';

router.route('/').get(getAllJobs).post(createJob);
router.route('/stats').get(showStats);
router.route('/:id').delete(deleteJob).patch(updateJob);

export default router;
