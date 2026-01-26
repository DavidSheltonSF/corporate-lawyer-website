import mongoose from 'mongoose';

export class MongodbConnector {
  static instance: MongodbConnector | null = null;

  private constructor(private connection: mongoose.Connection | null = null) {}

  static async connectAndReturn() {
    try {
      if (this.instance) return this.instance;
      await mongoose.connect(process.env.MONGODB_URI as string);
      console.log('Database connected');
      return new MongodbConnector(mongoose.connection);
    } catch (error) {
      console.log('Database connection error ' + error);
      process.exit(1);
    }
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
