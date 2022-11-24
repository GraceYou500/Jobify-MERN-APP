import Job from '../models/Job.js';
import { OK, StatusCodes } from 'http-status-codes';
import {
  BadRequestError,
  NotFoundError,
  UnauthenticatedError,
} from '../errors/index.js';
import checkPermissions from '../utils/checkPermissions.js';

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
  const { id: jobId } = req.params;

  const job = await Job.findOne({ _id: jobId });
  if (!job) {
    throw new NotFoundError(`Not found the job ${jobId}`);
  }

  checkPermissions(req.user, job.createdBy);

  await job.remove();
  res.status(StatusCodes.OK).json({ msg: 'Success! Job removed' });
};

const getAllJobs = async (req, res) => {
  const jobs = await Job.find({ createdBy: req.user.userId });
  res
    .status(StatusCodes.OK)
    .json({ jobs, totalJobs: jobs.length, numOfPages: 1 });
};

const updateJob = async (req, res) => {
  const { id: jobId } = req.params;
  const { company, position, jobLocation } = req.body;
  if (!company || !position) {
    throw new BadRequestError('Please provide all values');
  }

  const job = await Job.findOne({ _id: jobId });
  if (!job) {
    throw new NotFoundError(`No job with the job ID: ${jobId}`);
  }

  // permission check
  console.log(typeof req.user.userId);
  console.log(typeof job.createdBy);

  checkPermissions(req.user, job.createdBy);

  //option 1
  // job.position = position;
  // job.company = company;
  // job.jobLocation = jobLocation;

  // await job.save();

  //option 2
  const updatedJob = await Job.findOneAndUpdate({ _id: jobId }, req.body, {
    new: true,
    runValidators: true,
  });

  res.status(StatusCodes.OK).json({ job });
};

const showStats = async (req, res) => {
  res.send('showStats');
};

export { createJob, deleteJob, getAllJobs, updateJob, showStats };
