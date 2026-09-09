import { describe, beforeAll, beforeEach, afterAll, it, expect } from 'vitest';

import { config } from 'dotenv';
import { UserModel } from '../../../models/UserModel';
import { MongodbUserRepository } from './MongodbUserRepository';
import bcrypt from 'bcrypt';
import { Types } from 'mongoose';
import { UserMocker } from '../../../tests/mocks/entities/UserMocker';
import { GenericMocker } from '../../../tests/mocks/fields/GenericMocker';
import { UpdateUserDTO } from '../../../dtos/user/UpdateUserDTO';
import { MongodbTestConnector } from '../MongodbTestConnector';
config();

describe('Test UserRepository', () => {
  let connection: MongodbTestConnector | null = null;
  beforeAll(async () => {
    connection = await MongodbTestConnector.connectAndReturn(MongodbUserRepository.name);
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
    const fakeId = GenericMocker.mockMongoId().toString();

    return {
      userRepository,
      fakeId,
    };
  }

  describe('create', () => {
    it('should create a new user', async () => {
      const { userRepository } = makeSut();
      const userData = UserMocker.mockUserDTO();
      const created = await userRepository.create(userData);
      const passwordIsValid = bcrypt.compare(userData.password, created.password);

      expect(created).toMatchObject({ ...userData, password: expect.any(String) });
      expect(passwordIsValid).toBeTruthy();
    });
  });

  describe('findById', () => {
    it('should find user by id', async () => {
      const { userRepository } = makeSut();

      const userData = UserMocker.mockUserDTO();
      const userId = (await UserModel.create(userData))._id;
      const foundUser = await userRepository.findById(userId.toString());
      if (!foundUser) {
        throw Error('User not found');
      }

      const passwordIsValid = bcrypt.compare(userData.password, foundUser.password);

      expect(foundUser).toMatchObject({ ...userData, password: expect.any(String) });
      expect(passwordIsValid).toBeTruthy();
    });

    it('should find return null if user is not found user', async () => {
      const { userRepository, fakeId } = makeSut();

      const foundUser = await userRepository.findById(fakeId);

      expect(foundUser).toBeNull();
    });
  });

  describe('findByEmail', () => {
    it('should find user by email', async () => {
      const { userRepository } = makeSut();

      const userData = UserMocker.mockUserDTO();
      await UserModel.create(userData);

      const foundUser = await userRepository.findByEmail(userData.email);
      if (!foundUser) {
        throw Error('User not found');
      }

      const passwordIsValid = bcrypt.compare(userData.password, foundUser.password);

      expect(foundUser).toMatchObject({ ...userData, password: expect.any(String) });
      expect(passwordIsValid).toBeTruthy();
    });

    it('should find return null if user is not found user', async () => {
      const { userRepository } = makeSut();

      const email = 'fake@email.com';
      const foundUser = await userRepository.findByEmail(email);

      expect(foundUser).toBeNull();
    });
  });

  describe('existsById', () => {
    it('should return true if user exists, but false if user does not exist', async () => {
      const { userRepository } = makeSut();

      const userData = UserMocker.mockUserDTO();
      const userId = (await UserModel.create(userData))._id.toString();
      const nonExistingId = GenericMocker.mockMongoId().toString();

      const existingUser = await userRepository.existsById(userId);
      const nonExistingUser = await userRepository.existsById(nonExistingId);

      expect(existingUser).toBeTruthy();
      expect(nonExistingUser).toBeFalsy();
    });
  });

  describe('existsByEmail', () => {
    it('should return true if user exists, but false if user does not exist, given the email', async () => {
      const { userRepository } = makeSut();

      const userData = UserMocker.mockUserDTO();
      await UserModel.create(userData);

      const existingUser = await userRepository.existsByEmail(userData.email);
      const nonExistingUser = await userRepository.existsByEmail('fakeiiuuu@email.com');

      expect(existingUser).toBeTruthy();
      expect(nonExistingUser).toBeFalsy();
    });
  });

  describe('deleteById', () => {
    it('should delete a user', async () => {
      const { userRepository } = makeSut();

      const userData = UserMocker.mockUserDTO();
      const userId = (await UserModel.create(userData))._id;

      await userRepository.deleteById(userId.toString());

      const deletedUser = await UserModel.findById(userId);
      expect(deletedUser).toBeNull();
    });

    it('should return null if user is not found', async () => {
      const { userRepository, fakeId } = makeSut();

      const deletedUser = await userRepository.deleteById(fakeId);
      expect(deletedUser).toBeNull();
    });
  });
  describe('updateById', () => {
    it('should update a user', async () => {
      const { userRepository } = makeSut();

      const userData = UserMocker.mockUserDTO();
      const userId = (await UserModel.create(userData))._id;

      const updateData: Partial<UpdateUserDTO> = { firstName: 'Updated' };
      await userRepository.updateById(userId.toString(), updateData);

      // Ensure user is actually updated
      const updatedUser = await UserModel.findById(userId);

      expect(updatedUser).toMatchObject({
        ...userData,
        _id: expect.anything(),
        password: expect.any(String),
        firstName: updateData.firstName,
      });
    });

    it('should return null if user is not found', async () => {
      const { userRepository, fakeId } = makeSut();

      const updateData: Partial<UpdateUserDTO> = { firstName: 'Updated' };

      const updated = await userRepository.updateById(fakeId, updateData);
      expect(updated).toBeNull();
    });
  });
});
