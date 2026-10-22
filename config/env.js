import {config} from 'dotenv';

config({ path: `.env.${process.env.NODE_ENV || 'development'}.local` });

export const { PORT, NODE_ENV} = process.env;
export const MONGODB_URI = process.env.MONGODB_URI;