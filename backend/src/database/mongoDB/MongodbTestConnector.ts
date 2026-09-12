import mongoose from 'mongoose';
import { config } from 'dotenv';
config();

function getTestURI(workerId: string): string {
  const URI = process.env.MONGODB_TEST_URI as string;
  return URI.replace('corporate_website_test', `${workerId}`);
}

export class MongodbTestConnector {
  static instance: MongodbTestConnector | null = null;

  private constructor(private connection: mongoose.Connection | null = null) {}

  static async connect(workerId: string): Promise<void> {
    try {
      await mongoose.connect(getTestURI(workerId));
    } catch (error) {
      console.log('Database error');
      process.exit(1);
    }
  }

  static async connectAndReturn(workerId: string): Promise<MongodbTestConnector> {
    if (this.instance) return this.instance;
    await this.connect(workerId);
    this.instance = new MongodbTestConnector(mongoose.connection);
    return this.instance;
  }

  async disconnect() {
    try {
      if (!this.connection) return;
      await this.connection.close();
      this.connection = null;
      MongodbTestConnector.instance = null;
    } catch (error) {
      console.log(error);
    }
  }

  async deleteDatabase() {
    await this.connection?.dropDatabase();
  }

  createModel(name: string, schema: any) {
    return this.connection?.model(name, schema);
  }
}
