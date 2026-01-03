import mongoose from 'mongoose';
export class DatabaseConnector {
  static connected = false;

  static async connect() {
    try {
      if (this.connected) return;
      await mongoose.connect(process.env.MONGODB_URI as string);
      this.connected = true;
      console.log('Database connected');
    } catch (error) {
      console.log('Database connection error ' + error);
      process.exit(1);
    }
  }

  static async disconnect() {
    try {
      if (!this.connected) return;
      await mongoose.disconnect();
      this.connected = false;
    } catch (error) {
      console.log(error);
    }
  }
}
