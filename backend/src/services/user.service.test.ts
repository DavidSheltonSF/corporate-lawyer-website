import { DatabaseConnector } from '../config/database';
import { UserModel } from '../models/user.model';
import { User } from '../types/User';
import { UserRole } from '../types/UserRole';
import { UserService } from './user.service';
import { config } from 'dotenv';

config()

jest.setTimeout(9999);

describe('Test UserService', () => {
  beforeAll(async () => {
    await DatabaseConnector.connect();
    await UserModel.deleteMany({});
  });

  afterAll(async () => {
    await DatabaseConnector.disconnect();
  });

  function makeSut() {
    const userService = new UserService();

    return {
      userService,
    };
  }

  test('should create a new user', async () => {
    const { userService } = makeSut();

    const newUser = {
      firstName: 'David',
      lastName: 'Faria',
      cpf: '18877748777',
      email: 'david@email.com',
      password: 'david123',
      role: UserRole.client,
    };

    const createdUser = await userService.create(newUser);

    const {password, ...userWithoutPassword} = newUser

    expect(createdUser).toMatchObject(userWithoutPassword);

  });

 
});
