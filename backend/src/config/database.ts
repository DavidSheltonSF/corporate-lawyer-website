import mongoose from 'mongoose';

export class DatabaseConnector {
  static async connect() {
    try {
      await mongoose.connect(process.env.MONGODB_URI as string);
      console.log('Database connected');
    } catch (error) {
      console.log('Database connection error ' + error);
      process.exit(1);
    }
  }

  static async disconnect() {
    try {
      await mongoose.disconnect();
    } catch (error) {
      console.log(error);
    }
  }
}
