import express from 'express';
const router = express.Router();

import {
    createApplicant,
    getAllApplicants,
    deleteApplicant,
    editApplicant
} from '../controllers/applicantController.js';
import testUser from '../middleware/testUser.js';

router.route('/').put(testUser, createApplicant);
router.route('/').get(testUser, getAllApplicants);
router.route('/').delete(testUser, deleteApplicant);
router.route('/').post(testUser, editApplicant);

export default router;
