import mongoose from 'mongoose';
import { config } from 'dotenv';
config();

export class MongodbConnector {
  static instance: MongodbConnector | null = null;

  private constructor(private connection: mongoose.Connection | null = null) {}

  static async connect(): Promise<void> {
    try {
      if (this.instance) return;
      await mongoose.connect(process.env.MONGODB_URI as string);
      console.log('Database connected');
    } catch (error) {
      console.log('Database connection error ' + error);
      process.exit(1);
    }
  }

  static async connectAndReturn(): Promise<MongodbConnector> {
    if (this.instance) return this.instance;
    await this.connect();
    this.instance = new MongodbConnector(mongoose.connection);
    return this.instance;
  }

  async disconnect() {
    try {
      if (!this.connection) return;
      await this.connection.close();
      this.connection = null;
    } catch (error) {
      console.log(error);
    }
  }
}
