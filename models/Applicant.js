import mongoose from 'mongoose';
import validator from 'validator';

const ApplicantSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: [true, 'Please provide firstName'],
      maxlength: 32,
    },
    lastName: {
      type: String,
      required: [true, 'Please provide lastName'],
      maxlength: 32,
    },
    position: {
      type: String,
      maxlength: 100,
    },
    description: {
      type: String,
      default: '',
    },
    email: {
      type: String,
      required: [true, 'Please provide email'],
      validate: {
        validator: validator.isEmail,
        message: 'Please provide a valid email',
      },
    },
    createdAt: {
        type: Date ,
    },
    skills: [{
        type: String,
    }]
  },
  { timestamps: true }
);

export default mongoose.model('Applicant', ApplicantSchema);
