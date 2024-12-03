import mongoose from 'mongoose';

const MONGO_URI = "mongodb+srv://mailyuvraj0317:EtlUb1RLLKq0zj0Q@formdata.ie7e9.mongodb.net/?retryWrites=true&w=majority&appName=FormData";

export default async function connectToDatabase() {
  if (mongoose.connection.readyState === 1) return mongoose.connection;
  await mongoose.connect(MONGO_URI, { useNewUrlParser: true });
  console.log('Connected to MongoDB');
}
