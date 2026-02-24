import { Client, ClientConfig, QueryResult } from 'pg';
import { config } from 'dotenv';

config();

export class PostgresConnector {
  static instance: PostgresConnector | null = null;
  private client: Client;

  private constructor(config: ClientConfig) {
    this.client = new Client(config);
  }

  static getInstance(): PostgresConnector {
    if (this.instance) {
      return this.instance;
    }

    this.instance = new PostgresConnector({
      connectionString: process.env.PSQL_DATABASE_URL,
      host: process.env.PSQL_DATABASE_HOST,
      user: process.env.PSQL_DATABASE_USER,
      port: Number(process.env.PSQL_DATABASE_PORT),
      password: process.env.PSQL_DATABASE_PASSWORD,
      database: process.env.PSQL_DATABASE_NAME,
      ssl: Boolean(process.env.PSQL_DATABASE_SSL),
    });

    return this.instance;
  }
  async connect() {
    try {
      await this.client.connect();
    } catch (error) {
      console.log(error);
      process.exit(1);
    }
  }
  async disconnect() {
    await this.client.end();
  }
  async query(queryStream: any): Promise<QueryResult> {
    return await this.client.query(queryStream);
  }
  resetTables() {}
}
