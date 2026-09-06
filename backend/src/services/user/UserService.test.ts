import { describe, expect, it, vi } from 'vitest';
import { UserService } from './UserService';
import { createMockUserRepository } from '../../tests/mocks/repositories/createMockUserRepository';
import { createMockCaseRepository } from '../../tests/mocks/repositories/createMockCaseRepository';
import { UserMocker } from '../../tests/mocks/entities/UserMocker';
import { generateTemporaryPassword } from '../helpers/generateTemporaryPassword';
import { createMockPage } from '../../tests/mocks/createMockPage';
import { UserQuery } from '../../types/UserQuery';
import { UpdateUserDTO } from '../../dtos/user/UpdateUserDTO';
import { UserMapper } from '../../mappers/User/UserMapper';

describe(`Test ${UserService.name}`, () => {
  function makeSut() {
    const userRepository = createMockUserRepository();
    const caseRepository = createMockCaseRepository();
    const userService = new UserService(userRepository, caseRepository);
    const fakeId = 'fakeId';
    const fakeEmail = 'fake@email.com';

    return {
      userRepository,
      caseRepository,
      userService,
      fakeId,
      fakeEmail,
    };
  }

  describe('createClient', () => {
    it('should create a new client', async () => {
      const { userRepository, userService } = makeSut();

      const expectedClient = UserMocker.mockUserDTOWithId();
      userRepository.create.mockResolvedValue(expectedClient);

      vi.mock('../helpers/generateTemporaryPassword');
      const test = vi.mocked(generateTemporaryPassword);
      test.mockReturnValue(expectedClient.password);

      const clientData = UserMocker.mockCreateClientDTO();
      const newClient = await userService.createClient(clientData);

      expect(newClient).toMatchObject(expectedClient);
      expect(userRepository.create).toHaveBeenCalledWith(expect.objectContaining(clientData));
    });
  });

  describe('findAll', () => {
    it('should find all users', async () => {
      const { userRepository, userService } = makeSut();

      const client1 = UserMocker.mockUserDTOWithId();
      const client2 = UserMocker.mockUserDTOWithId();
      const expectedClients = [client1, client2];
      userRepository.findAll.mockResolvedValue(expectedClients);

      const clients = await userService.findAll();

      expect(clients).toEqual([
        {
          id: client1.id,
          firstName: client1.firstName,
          lastName: client1.lastName,
          cpf: client1.cpf,
          email: client1.email,
          phone: client1.phone,
          role: client1.role,
        },
        {
          id: client2.id,
          firstName: client2.firstName,
          lastName: client2.lastName,
          cpf: client2.cpf,
          email: client2.email,
          phone: client2.phone,
          role: client2.role,
        },
      ]);

      expect(clients[0]).not.toHaveProperty('password');
      expect(clients[1]).not.toHaveProperty('password');
    });
  });

  describe('findClients', () => {
    it('should find all clients for the given params', async () => {
      const { userRepository, userService } = makeSut();

      const client1 = UserMocker.mockUserDTOWithId();
      const client2 = UserMocker.mockUserDTOWithId();
      const expectedClients = [client1, client2];
      const limit = 4;
      const page = 1;
      const mockPage = createMockPage(expectedClients, { limit, page });
      userRepository.findClients.mockResolvedValue(mockPage);

      const userPageParams: UserQuery = { limit, page, query: 'test' };
      const clientPage = await userService.findClients(userPageParams);
      const clients = clientPage.items;
      const meta = clientPage.meta;

      const safeClient1 = UserMapper.toResponse(client1);
      const safeClient2 = UserMapper.toResponse(client2);

      expect(clients).toEqual([safeClient1, safeClient2]);
      expect(meta).toMatchObject(mockPage.meta);
      expect(clients[0]).not.toHaveProperty('password');
      expect(clients[1]).not.toHaveProperty('password');
      expect(userRepository.findClients).toHaveBeenCalledWith(userPageParams);
    });
  });

  describe('findById', () => {
    it('should find a client by id', async () => {
      const { userRepository, userService, fakeId } = makeSut();

      const expectedUser = UserMocker.mockUserDTOWithId();
      userRepository.findById.mockResolvedValue(expectedUser);

      const user = await userService.findById(fakeId);

      const safeUser = UserMapper.toResponse(expectedUser);

      expect(user).toEqual(safeUser);
      expect(user).not.toHaveProperty('password');
      expect(userRepository.findById).toHaveBeenCalledWith(fakeId);
    });

    it('should return null if user is not found', async () => {
      const { userRepository, userService, fakeId } = makeSut();

      userRepository.findById.mockResolvedValue(null);
      const user = await userService.findById(fakeId);

      expect(user).toBeNull();
      expect(userRepository.findById).toHaveBeenCalledWith(fakeId);
    });
  });

  describe('findByEmail', () => {
    it('should find a client by email', async () => {
      const { userRepository, userService, fakeEmail } = makeSut();

      const expectedUser = UserMocker.mockUserDTOWithId();
      userRepository.findByEmail.mockResolvedValue(expectedUser);

      const user = await userService.findByEmail(fakeEmail);

      const safeUser = UserMapper.toResponse(expectedUser);

      expect(user).toMatchObject(safeUser);
      expect(user).not.toHaveProperty('password');
      expect(userRepository.findByEmail).toHaveBeenCalledWith(fakeEmail);
    });

    it('should return null if user is not found', async () => {
      const { userRepository, userService, fakeEmail } = makeSut();

      userRepository.findById.mockResolvedValue(null);
      const user = await userService.findByEmail(fakeEmail);

      expect(user).toBeNull();
      expect(userRepository.findByEmail).toHaveBeenCalledWith(fakeEmail);
    });
  });

  describe('updateById', () => {
    it('should update a user by id', async () => {
      const { userRepository, userService, fakeId } = makeSut();

      const updateData: Partial<UpdateUserDTO> = {
        firstName: 'New Name',
      };

      const expectedUser = UserMocker.mockUserDTOWithId();
      userRepository.updateById.mockResolvedValue(expectedUser);

      const updatedUser = await userService.updateById(fakeId, updateData);

      const safeUser = UserMapper.toResponse(expectedUser);

      expect(updatedUser).toMatchObject(safeUser);
      expect(userRepository.updateById).toHaveBeenCalledWith(fakeId, updateData);
    });

    it('should return null if user is not found', async () => {
      const { userRepository, userService, fakeId } = makeSut();

      const updateData: Partial<UpdateUserDTO> = {
        firstName: 'David',
      };

      userRepository.updateById.mockResolvedValue(null);
      const updatedUser = await userService.updateById(fakeId, updateData);

      expect(updatedUser).toBeNull();
      expect(userRepository.updateById).toHaveBeenCalledWith(fakeId, updateData);
    });
  });

  describe('deleteById', () => {
    it('should delete a user by id and delete the user cases', async () => {
      const { userRepository, caseRepository, userService, fakeId } = makeSut();

      const expectedUser = UserMocker.mockUserDTOWithId();
      userRepository.deleteById.mockResolvedValue(expectedUser);

      const safeUser = UserMapper.toResponse(expectedUser);

      const deletedUser = await userService.deleteById(fakeId);

      expect(deletedUser).toMatchObject(safeUser);
      expect(userRepository.deleteById).toHaveBeenCalledWith(fakeId);
      expect(caseRepository.deleteByUserId).toHaveBeenCalledWith(fakeId);
    });
  });
});
