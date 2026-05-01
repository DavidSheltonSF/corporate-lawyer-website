import { config } from 'dotenv';
import { UserModel } from '../../../models/UserModel';
import { MongodbUserRepository } from './MongodbUserRepository';
import bcrypt from 'bcrypt';
import { Types } from 'mongoose';
import { MongodbTestConnector } from '../MongodbTestConnector';
import { UserMocker } from '../../../tests/mocks/UserMocker';
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
    const userDTO = UserMocker.mockUserDTO();
    const user = await userRepository.create(userDTO);
    const passwordIsValid = bcrypt.compare(userDTO.password, user.password);

    expect(user).toMatchObject({ ...userDTO, password: expect.any(String) });
    expect(passwordIsValid).toBeTruthy();
  });

  test('should find user by id', async () => {
    const { userRepository } = makeSut();
    const userDTO = UserMocker.mockUserDTO();
    const newId = (await UserModel.create(userDTO))._id;
    const user = await userRepository.findById(newId.toString());
    if (!user) {
      throw Error('User not found');
    }
    const passwordIsValid = bcrypt.compare(userDTO.password, user.password);

    expect(user).toMatchObject({ ...userDTO, password: expect.any(String) });
    expect(passwordIsValid).toBeTruthy();
  });

  test('should find user by email', async () => {
    const { userRepository } = makeSut();
    const userDTO = UserMocker.mockUserDTO();
    await UserModel.create(userDTO);
    const user = await userRepository.findByEmail(userDTO.email);
    if (!user) {
      throw Error('User not found');
    }
    const passwordIsValid = bcrypt.compare(userDTO.password, user.password);

    expect(user).toMatchObject({ ...userDTO, password: expect.any(String) });
    expect(passwordIsValid).toBeTruthy();
  });

  test('should return true if user exists, but false if user does not exist', async () => {
    const { userRepository } = makeSut();
    const userDTO = UserMocker.mockUserDTO();
    const newId = (await UserModel.create(userDTO))._id;

    const existingUser = await userRepository.existsById(newId.toString());
    const nonExistingUser = await userRepository.existsById(
      Types.ObjectId.createFromTime(89466141).toString()
    );
    expect(existingUser).toBeTruthy();
    expect(nonExistingUser).toBeFalsy();
  });

  test('should return true if user exists, but false if user does not exist, given the email', async () => {
    const { userRepository } = makeSut();
    const userDTO = UserMocker.mockUserDTO();
    await UserModel.create(userDTO);

    const existingUser = await userRepository.existsByEmail(userDTO.email);
    const nonExistingUser = await userRepository.existsByEmail('fakeiiuuu@email.com');

    expect(existingUser).toBeTruthy();
    expect(nonExistingUser).toBeFalsy();
  });

  test('should delete a user', async () => {
    const { userRepository } = makeSut();
    const userDTO = UserMocker.mockUserDTO();

    const userId = (await UserModel.create(userDTO))._id;

    const result = await userRepository.deleteById(userId.toString());
    expect(result?.firstName).toBe(userDTO.firstName);
    expect(result?.lastName).toBe(userDTO.lastName);
    expect(result?.cpf).toBe(userDTO.cpf);
    expect(result?.email).toBe(userDTO.email);
    expect(result?.role).toBe(userDTO.role);

    expect(result).toMatchObject({ ...userDTO, password: expect.any(String) });

    // Ensure user is actually deleted
    const deletedUser = await UserModel.findById(userId);
    expect(deletedUser).toBeNull();
  });

  test('should update a user', async () => {
    const { userRepository } = makeSut();

    const userDTO = UserMocker.mockUserDTO();
    const userId = (await UserModel.create(userDTO))._id;

    const result = await userRepository.updateById(userId.toString(), { firstName: 'Updated' });

    expect(result).toMatchObject({
      ...userDTO,
      password: expect.any(String), //password is encrypted right after saved
      firstName: expect.any(String), //first name was updated
    });

    // Ensure user is actually updated
    const updatedUser = await UserModel.findById(userId);
    console.log(updatedUser);

    expect(updatedUser).toMatchObject({
      ...userDTO,
      _id: expect.anything(),
      password: expect.any(String),
      firstName: expect.anything(),
    });
    expect(updatedUser?.firstName).toBe('Updated');
  });
});
