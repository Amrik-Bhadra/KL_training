import mongoose from 'mongoose';
import { env } from './env';

export async function connectDB() {
  if (!env.MONGO_URI) {
    console.error('MONGO_URI not set');
    process.exit(1);
  }
  await mongoose.connect(env.MONGO_URI);
  mongoose.connection.on('connected', () => console.log('MongoDB connected'));
  mongoose.connection.on('error', (e) => console.error('MongoDB error', e));
}
