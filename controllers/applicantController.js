import { OK, StatusCodes } from 'http-status-codes';
import {
  NotFoundError,
} from '../errors/index.js';
import Applicant from '../models/Applicant.js';

const createApplicant = async (req, res) => {
    const { firstName, lastName, position, description, email, skills } = req.body;

    const applicant = await Applicant.create({ firstName, lastName, position, description, email, skills, createdAt: new Date() });
    res.status(StatusCodes.OK).json({ applicant });
};

const getAllApplicants = async (req, res) => {
    const applicants = await Applicant.find();
    res.status(StatusCodes.OK).json({ applicants });
};

const deleteApplicant = async (req, res) => {
    const { id } = req.body;

    const applicant = await Applicant.findOne({ _id: id });

    if (!applicant) {
      throw new NotFoundError(`Not found the applicant ${id}`);
    }
  
    await applicant.remove();
    res.status(StatusCodes.OK).json({ msg: 'Success! applicant removed' });

};

const editApplicant = async (req, res) => {
    const { id, firstName, lastName, position, description, email, skills  } = req.body;

    const applicant = await Applicant.findOne({ _id: id });
    
    if (!applicant) {
        throw new NotFoundError(`Not found the applicant ${id}`);
    }

    await Applicant.findOneAndUpdate({ _id: id }, req.body);

    const updatedApplicant =  await Applicant.findOne({ _id: id });
      
    res.status(StatusCodes.OK).json({updatedApplicant});
}

export { createApplicant, getAllApplicants, deleteApplicant, editApplicant };
