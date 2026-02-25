import { config } from 'dotenv';
import { UserModel } from '../../../models/UserModel';
import { MongodbUserRepository } from './MongodbUserRepository';
import { UserRole } from '../../../types/UserRole';
import bcrypt from 'bcrypt';
import { Types } from 'mongoose';
import { MongodbTestConnector } from '../MongodbTestConnector';
config();

jest.setTimeout(999999);

describe('Test UserRepository', () => {
  let connection: MongodbTestConnector | null = null
  beforeAll(async () => {
    connection = await MongodbTestConnector.connectAndReturn('user_repository_test');
  });

  beforeEach(async () => {
    await UserModel.deleteMany({});
  });

  afterAll(async () => {
    await connection?.deleteDatabase()
    await connection?.disconnect()
  });

  function makeSut() {
    const userRepository = new MongodbUserRepository();

    return {
      userRepository,
    };
  }

  test('should create a new user', async () => {
    const { userRepository } = makeSut();

    const newUser = {
      firstName: 'José',
      lastName: 'Sílva',
      cpf: '18877748777',
      email: 'jose@email.com',
      password: 'jose123',
      role: UserRole.client,
    };

    const user = await userRepository.create(newUser);
    const { password, ...newUserWithoutPassword } = newUser;
    const passwordIsValid = bcrypt.compare(password, user.password);
    expect(user).toMatchObject(newUserWithoutPassword);
    expect(passwordIsValid).toBeTruthy();
  });

  test('should find user by id', async () => {
    const { userRepository } = makeSut();

    const newUser = {
      firstName: 'José',
      lastName: 'Sílva',
      cpf: '18877748777',
      email: 'jose@email.com',
      password: 'jose123',
      role: UserRole.client,
    };

    const newId = (await UserModel.create(newUser))._id;

    const user = await userRepository.findById(newId.toString());

    if (!user) {
      throw Error('User not found');
    }

    const { password, ...newUserWithoutPassword } = newUser;

    const passwordIsValid = bcrypt.compare(password, user.password);

    expect(user).toMatchObject(newUserWithoutPassword);
    expect(passwordIsValid).toBeTruthy();
  });

  test('should find user by email', async () => {
    const { userRepository } = makeSut();

    const newUser = {
      firstName: 'José',
      lastName: 'Sílva',
      cpf: '18877748777',
      email: 'jose@email.com',
      password: 'jose123',
      role: UserRole.client,
    };

    await UserModel.create(newUser);

    const user = await userRepository.findByEmail(newUser.email);

    if (!user) {
      throw Error('User not found');
    }

    const { password, ...newUserWithoutPassword } = newUser;

    const passwordIsValid = bcrypt.compare(password, user.password);

    expect(user).toMatchObject(newUserWithoutPassword);
    expect(passwordIsValid).toBeTruthy();
  });

  test('should return true if user exists, but false if user does not exist', async () => {
    const { userRepository } = makeSut();

    const newUser = {
      firstName: 'José',
      lastName: 'Sílva',
      cpf: '18877748777',
      email: 'jose@email.com',
      password: 'jose123',
      role: UserRole.client,
    };

    const newId = (await UserModel.create(newUser))._id;

    const existingUser = await userRepository.exists(newId.toString());
    const nonExistingUser = await userRepository.exists(
      Types.ObjectId.createFromTime(89466141).toString()
    );

    expect(existingUser).toBeTruthy();
    expect(nonExistingUser).toBeFalsy();
  });
});
