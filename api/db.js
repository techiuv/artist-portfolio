import mongoose from 'mongoose';

const MONGO_URI = process.env.VITE_MONGO_URI;

let isConnected; 

export default async function connectToDatabase() {
  if (isConnected) {
    return mongoose.connection;
  }

  if (mongoose.connection.readyState === 1) {
    isConnected = true;
    return mongoose.connection;
  }

  try {
    const db = await mongoose.connect(MONGO_URI);
    isConnected = db.connections[0].readyState === 1;
    console.log('Connected to MongoDB');
    return db;
  } catch (error) {
    console.error('Database connection error:', error);
    throw error;
  }
}
