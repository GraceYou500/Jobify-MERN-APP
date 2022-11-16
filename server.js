import express from 'express';

const app = express();
import dotenv from 'dotenv';
dotenv.config();
import 'express-async-errors';

// db and authenticateUser
import connectDB from './db/connect.js'; // make sure connectDB is above middleware import

// routers
import authRouter from './routes/authRoutes.js';
import jobRouter from './routes/jobRoutes.js';

// middleware
import notFoundMiddleware from './middleware/not-found.js';
import errorHandlerMiddleware from './middleware/error-handler.js';

app.use(express.json()); // this will make only json data available to us in the controllers, since we'll have post req, we look for staffs, and the staff => JSON data will be pass through us using the express.json() middleware.

app.get('/', (req, res) => {
  res.json({ msg: 'Welcome!' });
});

app.get('/api/v1', (req, res) => {
  res.json({ msg: 'Welcome API!' });
});

app.use('/api/v1/auth', authRouter);
app.use('/api/v1/jobs', jobRouter);

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
