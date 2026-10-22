import express from 'express';
import cookieParser from 'cookie-parser';
import { PORT } from './config/env.js';

import subscriptionRouter from './routes/subcription.routes.js';
import userRouter from './routes/user.routes.js';
import authRouter from './routes/auth.routes.js';
import connectToDatabase from './database/mongodb.js';
import errorMiddleware from './middlewares/error.middlewares.js';
const app = express();

//Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false}));
app.use(cookieParser());

//Routes
app.use('/api/v1/auth', authRouter);
app.use('/api/v1/subscriptions', subscriptionRouter);
app.use('/api/v1/users', userRouter);

app.use(errorMiddleware);

app.get("/", (req, res) => {
  res.send('Welcome to the Subscription Tracker API!');
});

app.listen(PORT, async () => {
  console.log(`Subscription Tracker API server is running on http://localhost:${PORT}`);

  await connectToDatabase();
});

export default app;