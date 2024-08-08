// src/config/index.ts
import mongoose from 'mongoose';


const connectDB = async () => {
  try {
    const mongoURI = process.env.MONGODB_URL  || '';

    if (!mongoURI) {
      throw new Error('MongoDB URI not found in .env file');
    }

    await mongoose.connect(mongoURI);

    console.log('MongoDB connected successfully');
  } catch (error) {
    console.error('Error connecting to MongoDB:', error);
    process.exit(1); 
  }
};

export default connectDB;
