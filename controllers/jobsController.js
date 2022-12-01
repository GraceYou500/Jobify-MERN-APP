import Job from '../models/Job.js';
import { OK, StatusCodes } from 'http-status-codes';
import {
  BadRequestError,
  NotFoundError,
  UnauthenticatedError,
} from '../errors/index.js';
import checkPermissions from '../utils/checkPermissions.js';
import mongoose from 'mongoose';
import moment from 'moment';

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
  const { status, jobType, sort, search } = req.query;

  const queryObject = { createdBy: req.user.userId };

  // add stuff based on condition
  if (status && status !== 'all') {
    queryObject.status = status;
  }

  if (jobType && jobType !== 'all') {
    queryObject.jobType = jobType;
  }

  if (search) {
    queryObject.position = { $regex: search, $options: 'i' };
  } // i: case insensitive, $regex: search value

  // No await => get query promise and not the value
  console.log('queryObject..................', queryObject);
  let result = Job.find(queryObject);

  // chain sort conditions

  if (sort === 'latest') {
    result = result.sort('-createdAt');
  }
  if (sort === 'oldest') {
    result = result.sort('createdAt');
  }
  if (sort === 'a-z') {
    result = result.sort('position');
  }
  if (sort === 'z-a') {
    result = result.sort('-position');
  }
  const jobs = await result;

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
  let stats = await Job.aggregate([
    { $match: { createdBy: mongoose.Types.ObjectId(req.user.userId) } },
    { $group: { _id: '$status', count: { $sum: 1 } } },
  ]);

  stats = stats.reduce((acc, item) => {
    const { _id: title, count } = item;
    acc[title] = count;
    return acc;
  }, {});

  const defaultStats = {
    pending: stats.pending || 0,
    declined: stats.declined || 0,
    interview: stats.interview || 0,
  };

  let monthlyApplications = await Job.aggregate([
    { $match: { createdBy: mongoose.Types.ObjectId(req.user.userId) } },
    {
      $group: {
        _id: { year: { $year: '$createdAt' }, month: { $month: '$createdAt' } },
        count: { $sum: 1 },
      },
    },
    { $sort: { '_id.year': -1, '_id.month': -1 } },
    { $limit: 6 },
  ]);
  //sort: -1 => we want the latest month and year.

  monthlyApplications = monthlyApplications
    .map((item) => {
      const {
        _id: { year, month },
        count,
      } = item;
      const date = moment()
        .month(month - 1)
        .year(year)
        .format('MMM Y');
      return { date, count };
    })
    .reverse();
  // month -1: in moment, the month is from 0 to 11, but in mongoose the month forom 1 to 12, so need to -1 for moment. reverse because we want to show the date from oldest to new (in the last 6 months).

  res.status(StatusCodes.OK).json({ defaultStats, monthlyApplications });
};

export { createJob, deleteJob, getAllJobs, updateJob, showStats };
