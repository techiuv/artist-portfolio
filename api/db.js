import mongoose from 'mongoose';

const MONGO_URI = process.env.MONGO_URI;

export default async function connectToDatabase() {
  if (mongoose.connection.readyState === 1) return mongoose.connection;
  await mongoose.connect(MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true });
  console.log('Connected to MongoDB');
}
