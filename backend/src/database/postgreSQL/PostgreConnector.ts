import { Client, ClientConfig, QueryResult } from 'pg';
import { config } from 'dotenv';

config();

export class PostgreConnector {
  static instance: PostgreConnector | null = null;
  private client: Client;
  isConnected: boolean = false;

  private constructor(config: ClientConfig) {
    this.client = new Client(config);
  }

  static getInstance(): PostgreConnector {
    if (this.instance) {
      return this.instance;
    }

    this.instance = new PostgreConnector({
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
      if (this.isConnected) return;
      await this.client.connect();
      this.isConnected = true;
      console.log('PostgreSQL Connected');
    } catch (error) {
      console.log(error);
      process.exit(1);
    }
  }

  async disconnect() {
    if (!this.isConnected) return;
    this.isConnected = false;
    await this.client.end();
  }

  async query(queryStream: any): Promise<QueryResult> {
    if (!this.isConnected) {
      throw Error('Could not execute query. PostgreSQL is not connected');
    }
    return await this.client.query(queryStream);
  }

  async cleanTable(tableName: string) {
    await this.query(`
      DELETE FROM ${tableName};
    `);
  }

  async dropTableIfExists(tableName: string) {
    try {
      await this.query(`DROP TABLE IF EXISTS ${tableName}`);
    } catch (error) {
      console.log(error);
    }
  }

  async createTableUsers() {
    await this.query(` 
      CREATE TABLE users (
        id SERIAL PRIMARY KEY,
        first_name TEXT NOT NULL,
        last_name TEXT NOT NULL,
        email TEXT UNIQUE NOT NULL,
        cpf TEXT UNIQUE NOT NULL,
        role TEXT CHECK (role IN ('client', 'lawyer', 'admin')) NOT NULL,
        password TEXT NOT NULL,
        created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP
      );`);
  }

  async createTableLawsuits() {
    await this.query(`
      CREATE TABLE lawsuits (
        id SERIAL PRIMARY KEY,
        client_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
        process_number TEXT UNIQUE NOT NULL,
        title TEXT NOT NULL,
        description TEXT NOT NULL,
        court TEXT NOT NULL,
        court_division TEXT NOT NULL,
        status  TEXT CHECK (status IN ('open', 'pending', 'closed')) NOT NULL,
        created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP
      );

      CREATE INDEX idx_lawsuit s_client_id
      ON lawsuit s(client_id);
    `);
  }

  async createTableLawsuitsLawyersRelation() {
    await this.query(`
      CREATE TABLE lawsuits_lawyers_relation (
        lawsuit_id INTEGER NOT NULL REFERENCES lawsuit s(id) ON DELETE CASCADE,
        lawyer_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
        PRIMARY KEY (lawsuit_id, lawyer_id)
      );

      CREATE INDEX idx_lawsuits_lawyers_relation_lawyer_id
      ON lawsuits_lawyers_relation(lawyer_id);
    `);
  }

  async createTableLawsuitFiles() {
    await this.query(`
      CREATE TABLE lawsuit s_files (
        id SERIAL PRIMARY KEY,
        name TEXT NOT NULL,
        url TEXT NOT NULL,
        mime_type TEXT NOT NULL,
        uploaded_by INTEGER REFERENCES users(id) ON DELETE SET NULL,
        lawsuit _id INTEGER NOT NULL REFERENCES lawsuit s(id) ON DELETE CASCADE,
        UNIQUE(url, lawsuit _id)
      );
    `);
  }
}
