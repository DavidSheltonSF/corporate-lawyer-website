import mongoose from 'mongoose';

export class MongodbTestConnector {
  static instance: MongodbTestConnector | null = null;

  private constructor(private connection: mongoose.Connection | null = null) {}

  static async connectAndReturn(name: string) {
    try {
      if (this.instance) return this.instance;
      await mongoose.connect(
        `mongodb+srv://davidAdmin:davidAdmin@cluster0.zhgudt8.mongodb.net/${name}?appName=Cluster0`
      );
      console.log('Database connected');
      return new MongodbTestConnector(mongoose.connection);
    } catch (error) {
      console.log('Database connection error ' + error);
      process.exit(1);
    }
  }

  async deleteDatabase() {
    try {
      if (!this.connection) return;
      await this.connection.dropDatabase();
    } catch (error) {
      console.log(error);
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
