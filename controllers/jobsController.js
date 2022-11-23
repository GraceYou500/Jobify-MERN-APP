import Job from '../models/Job.js';
import { StatusCodes } from 'http-status-codes';
import { BadRequestError, UnauthenticatedError } from '../errors/index.js';

const createJob = async (req, res) => {
  const { company, position } = req.body;
  if (!company || !position) {
    throw new BadRequestError('Please provide all values');
  }

  req.body.createdBy = req.user.userId;
  const job = await Job.create(req.body);

  // console.log('createJob............', job);

  res.status(StatusCodes.CREATED).json({ job });
};

const deleteJob = async (req, res) => {
  res.send('deleteJob');
};

const getAllJobs = async (req, res) => {
  const jobs = await Job.find({ createdBy: req.user.userId });

  res
    .status(StatusCodes.OK)
    .json({ jobs, totalJobs: jobs.length, numOfPages: 1 });
};

const updateJob = async (req, res) => {
  res.send('updateJob');
};

const showStats = async (req, res) => {
  res.send('showStats');
};

export { createJob, deleteJob, getAllJobs, updateJob, showStats };
