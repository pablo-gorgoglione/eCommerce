import mongoose, { ConnectOptions } from 'mongoose';

const connectDB = async () => {
  try {
    const mongoDB = process.env.MONGO_URL as string;
    const conn = await mongoose.connect(mongoDB, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    } as ConnectOptions);

    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.log('Error: ' + error);
    process.exit(1);
  }
};

export default connectDB;
