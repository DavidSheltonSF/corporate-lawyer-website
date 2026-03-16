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
  let connection: MongodbTestConnector | null = null;
  beforeAll(async () => {
    connection = await MongodbTestConnector.connectAndReturn('user_repository_test');
  });

  beforeEach(async () => {
    await UserModel.deleteMany({});
  });

  afterAll(async () => {
    await connection?.deleteDatabase();
    await connection?.disconnect();
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

    const existingUser = await userRepository.existsById(newId.toString());
    const nonExistingUser = await userRepository.existsById(
      Types.ObjectId.createFromTime(89466141).toString()
    );

    expect(existingUser).toBeTruthy();
    expect(nonExistingUser).toBeFalsy();
  });

  test('should return true if user exists, but false if user does not exist, given the email', async () => {
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

    const existingUser = await userRepository.existsByEmail(newUser.email);
    const nonExistingUser = await userRepository.existsByEmail('fakeiiuuu@email.com');

    expect(existingUser).toBeTruthy();
    expect(nonExistingUser).toBeFalsy();
  });

  test('should delete a user', async () => {
    const { userRepository } = makeSut();

    const newUser = {
      firstName: 'José',
      lastName: 'Sílva',
      cpf: '18877748777',
      email: 'jose@email.com',
      password: 'jose123',
      role: UserRole.client,
    };
    const userId = (await UserModel.create(newUser))._id;

    const result = await userRepository.deleteById(userId.toString());
    expect(result?.firstName).toBe(newUser.firstName);
    expect(result?.lastName).toBe(newUser.lastName);
    expect(result?.cpf).toBe(newUser.cpf);
    expect(result?.email).toBe(newUser.email);
    expect(result?.role).toBe(newUser.role);

    // Ensure user is actually deleted
    const deletedUser = await UserModel.findById(userId);
    expect(deletedUser).toBeNull();
  });

  test('should update a user', async () => {
    const { userRepository } = makeSut();

    const newUser = {
      firstName: 'José',
      lastName: 'Sílva',
      cpf: '18877748777',
      email: 'jose@email.com',
      password: 'jose123',
      role: UserRole.client,
    };
    const userId = (await UserModel.create(newUser))._id;

    const result = await userRepository.updateById(userId.toString(), { firstName: 'Updated' });
    expect(result?.firstName).toBe(newUser.firstName);
    expect(result?.lastName).toBe(newUser.lastName);
    expect(result?.cpf).toBe(newUser.cpf);
    expect(result?.email).toBe(newUser.email);
    expect(result?.role).toBe(newUser.role);

    // Ensure user is actually updated
    const updatedUser = await UserModel.findById(userId);
    expect(updatedUser?.firstName).toBe('Updated');
    expect(updatedUser?.lastName).toBe(newUser.lastName);
    expect(updatedUser?.cpf).toBe(newUser.cpf);
    expect(updatedUser?.email).toBe(newUser.email);
    expect(updatedUser?.role).toBe(newUser.role);
  });
});
