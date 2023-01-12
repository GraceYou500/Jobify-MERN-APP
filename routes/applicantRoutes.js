import express from 'express';
const router = express.Router();

import {
    createApplicant,
    getAllApplicants,
    deleteApplicant,
    editApplicant
} from '../controllers/applicantController.js';
import testUser from '../middleware/testUser.js';

router.route('/').put(testUser,createApplicant);
router.route('/').get(getAllApplicants);
router.route('/:id').delete(testUser, deleteApplicant);
router.route('/').post(testUser, editApplicant);

export default router;
