import mongoose from 'mongoose';
import { MONGODB_URI, NODE_ENV } from '../config/env.js';

if (!MONGODB_URI) {
  throw new Error('Please provide a valid MongoDB URI inside the .env.development.local file');
}

const connectToDatabase = async () => {
  try {
    await mongoose.connect(MONGODB_URI);
    console.log(`Connected to database in ${NODE_ENV} mode`);
  } catch (error) {
    console.error('Error connecting to the database: ', error);
    process.exit(1);
  }
};

export default connectToDatabase;
