import express from 'express';

const app = express();
import dotenv from 'dotenv';
dotenv.config();
import 'express-async-errors';
import morgan from 'morgan';

import { dirname } from 'path';
import { fileURLToPath } from 'url';
import path from 'path';

import helmet from 'helmet';
import xss from 'xss-clean';
import mongoSanitize from 'express-mongo-sanitize';
import cookieParser from 'cookie-parser';

// db and authenticateUser
import connectDB from './db/connect.js'; // make sure connectDB is above middleware import

// routers
import authRouter from './routes/authRoutes.js';
import jobRouter from './routes/jobRoutes.js';
import applicantRouter from './routes/applicantRoutes.js';
// middleware
import notFoundMiddleware from './middleware/not-found.js';
import errorHandlerMiddleware from './middleware/error-handler.js';
import authenticateUser from './middleware/auth.js';

const __dirname = dirname(fileURLToPath(import.meta.url));
// only when ready to deploy
app.use(express.static(path.resolve(__dirname, './client/build')));
// use express.static to serve the front end as our public assets

app.use(express.json()); // this will make only json data available to us in the controllers, since we'll have post req, we look for staffs, and the staff => JSON data will be pass through us using the express.json() middleware.
app.use(cookieParser());
app.use(helmet());
app.use(xss());
app.use(mongoSanitize());

if (process.env.NODE_ENV !== 'production') {
  app.use(morgan('dev'));
}

// app.get('/', (req, res) => {
//   res.json({ msg: 'Welcome!' });
// });

// app.get('/api/v1', (req, res) => {
//   res.json({ msg: 'Welcome API!' });
// });

app.use('/api/v1/auth', authRouter);
app.use('/api/v1/jobs', authenticateUser, jobRouter);
app.use('/api/v1/applicants', authenticateUser, applicantRouter);

app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, './client/build', 'index.html'));
}); // every get route to our server, we want to point to the index html from build folder, so we can access to front end application to backend

app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware);

const port = process.env.PORT || 5000;

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URL);

    app.listen(port, () => {
      console.log(`Server is listening on port ${port}...`);
    });
  } catch (error) {
    console.log(error);
  }
};

start();
