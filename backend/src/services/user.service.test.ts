import { DatabaseConnector } from '../config/database';
import { UserModel } from '../models/user.model';
import { User } from '../types/User';
import { UserRole } from '../types/UserRole';
import { UserService } from './user.service';
import { config } from 'dotenv';

config();

jest.setTimeout(999999);

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

    const { password, ...userWithoutPassword } = newUser;

    expect(createdUser).toMatchObject(userWithoutPassword);
  });

  test('should find all users', async () => {
    await UserModel.deleteMany({});
    const { userService } = makeSut();

    const users = [
      {
        firstName: 'José',
        lastName: 'Faria',
        cpf: '18778848777',
        email: 'jod55@email.com',
        password: 'nfksnfasfddsfd',
        role: UserRole.client,
      },
      {
        firstName: 'Maria',
        lastName: 'José',
        cpf: '11178848777',
        email: 'mari@email.com',
        password: 'sdgfad6fds',
        role: UserRole.client,
      },
    ];

    const usersWithoutPassword = users.map((user) => {
      const { password, ...userWithoutPassword } = user;
      return userWithoutPassword;
    });

    await UserModel.create(users);

    const foundUsers = await userService.findAll();

    expect(foundUsers).toHaveLength(users.length);
    expect(foundUsers).toEqual(
      expect.arrayContaining([
        expect.objectContaining(usersWithoutPassword[0]),
        expect.objectContaining(usersWithoutPassword[1]),
      ])
    );
  });

  test('should find a user by id', async () => {
    await UserModel.deleteMany({});
    const { userService } = makeSut();

    const user1 = {
      firstName: 'José',
      lastName: 'Faria',
      cpf: '18778848777',
      email: 'jod55@email.com',
      password: 'nfksnfasfddsfd',
      role: UserRole.client,
    };
    const user2 = {
      firstName: 'Maria',
      lastName: 'José',
      cpf: '11178848777',
      email: 'mari@email.com',
      password: 'sdgfad6fds',
      role: UserRole.client,
    };

    const createdUser1 = await UserModel.create(user1);
    const createdUser2 = await UserModel.create(user2);

    const foundUser = await userService.findById(createdUser2._id.toString());

    const { password, ...userWithoutPassword } = user2;

    expect(foundUser).toMatchObject(userWithoutPassword);
  });
});
