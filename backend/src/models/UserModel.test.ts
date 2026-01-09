import { DatabaseConnector } from '../config/database';
import { UserModel } from './UserModel';
import { config } from 'dotenv';
import bcrypt from 'bcrypt';

config();

jest.setTimeout(99999);

describe('Testing UserModel', () => {
  beforeAll(async () => {
    await DatabaseConnector.connect();
    await UserModel.deleteMany({});
  });

  afterAll(async () => {
    await DatabaseConnector.disconnect();
  });

  test('should create a new user', async () => {
    const newUser = {
      firstName: 'David',
      lastName: 'Faria',
      cpf: '18877748777',
      email: 'david@email.com',
      password: 'david123',
      role: 'client',
    };
    const result = await UserModel.create(newUser);

    expect(result.firstName).toBe(newUser.firstName);
    expect(result.lastName).toBe(newUser.lastName);
    expect(result.cpf).toBe(newUser.cpf);
    expect(result.email).toBe(newUser.email);
    expect(await bcrypt.compare(newUser.password, result.password)).toBeTruthy();
    expect(result.role).toBe(newUser.role);
  });
});
