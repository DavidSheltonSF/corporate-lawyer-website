import { describe, it, expect } from 'vitest';
import { createMockUserService } from '../../tests/mocks/services/createMockUserService';
import { UserController } from './UserController';
import { createMockHttpRequest } from '../../tests/mocks/createMockHttpRequest';
import { UserMocker } from '../../tests/mocks/entities/UserMocker';
import { HttpStatusCode } from '../types/HttpStatusCode';
import { BadRequestError } from '../../errors/presentation/BadRequestError';
import { createMockPage } from '../../tests/mocks/createMockPage';
import { NotFoundError } from '../../errors/presentation/NotFoundError';
import { UpdateUserDTO } from '../../dtos/user/UpdateUserDTO';

describe(`Test ${UserController.name}`, () => {
  function makeSut() {
    const userService = createMockUserService();
    const userController = new UserController(userService);

    return {
      userService,
      userController,
    };
  }

  describe('createClient', () => {
    it('should create a new client and return Created', async () => {
      const { userService, userController } = makeSut();

      const mockClient = UserMocker.mockCreateClientDTO();
      const httpRequest = createMockHttpRequest({
        body: mockClient,
      });

      const expectedUser = UserMocker.mockUserDTOWithId();
      userService.createClient.mockResolvedValue(expectedUser);

      const response = await userController.createClient(httpRequest);

      expect(userService.createClient).toHaveBeenCalledWith(mockClient);
      expect(response).toMatchObject({
        status: HttpStatusCode.created,
        data: expectedUser,
      });
    });

    it('should throw BadRequestError if any required field is missing', async () => {
      const { userService, userController } = makeSut();

      const mockIncompleteClient = {
        name: 'Tiago Ferreira',
      };
      const httpRequest = createMockHttpRequest({
        body: mockIncompleteClient,
      });

      await expect(userController.createClient(httpRequest)).rejects.toThrow(BadRequestError);
      expect(userService.createClient).not.toHaveBeenCalled();
    });
  });

  describe('findAll', () => {
    it('should find all users and return OK', async () => {
      const { userService, userController } = makeSut();

      const expectedClients = [UserMocker.mockUserDTOWithId(), UserMocker.mockUserDTOWithId()];
      userService.findAll.mockResolvedValue(expectedClients);

      const httpRequest = createMockHttpRequest();
      const response = await userController.findAll(httpRequest);

      expect(response).toMatchObject({
        status: HttpStatusCode.ok,
        data: expectedClients,
      });
      expect(userService.findAll).toHaveBeenCalled();
    });

    it('should find clients and return OK', async () => {
      const { userService, userController } = makeSut();

      const query = '';
      const limit = 1;
      const page = 1;

      const expectedClients = [UserMocker.mockUserDTOWithId()];
      const expectedPage = createMockPage(expectedClients, {
        limit,
        page,
      });
      userService.findClients.mockResolvedValue(expectedPage);

      const httpRequest = createMockHttpRequest({
        query: {
          query,
          limit,
          page,
        },
      });

      const response = await userController.findClients(httpRequest);

      expect(response).toMatchObject({
        status: HttpStatusCode.ok,
        data: expectedPage,
      });
      expect(userService.findClients).toHaveBeenCalledWith({ query, limit, page });
    });

    it('should throw BadRequestError if invalid pagination page was provided', async () => {
      const { userService, userController } = makeSut();

      const httpRequest = createMockHttpRequest({
        query: {
          page: 'banana',
          limit: 4,
        },
      });

      await expect(userController.findClients(httpRequest)).rejects.toThrow(BadRequestError);
      expect(userService.findClients).not.toHaveBeenCalled();
    });

    it('should throw BadRequestError if invalid pagination limit was provided', async () => {
      const { userService, userController } = makeSut();

      const httpRequest = createMockHttpRequest({
        query: {
          page: 1,
          limit: 'banana',
        },
      });

      await expect(userController.findClients(httpRequest)).rejects.toThrow(BadRequestError);
      expect(userService.findClients).not.toHaveBeenCalled();
    });
  });

  describe('findById', () => {
    it('should find a user by id and return OK', async () => {
      const { userService, userController } = makeSut();
      const id = 'fakeId';
      const httpRequest = createMockHttpRequest({
        params: { id },
      });

      const expectedUser = UserMocker.mockUserDTOWithId();
      userService.findById.mockResolvedValue(expectedUser);

      const response = await userController.findById(httpRequest);

      expect(response).toMatchObject({
        status: HttpStatusCode.ok,
        data: expectedUser,
      });

      expect(userService.findById).toHaveBeenCalledWith(id);
    });

    it('should throw BadRequest if no id was provided in the request params', async () => {
      const { userService, userController } = makeSut();

      const httpRequest = createMockHttpRequest();

      await expect(userController.findById(httpRequest)).rejects.toThrow(BadRequestError);
      expect(userService.findById).not.toHaveBeenCalled();
    });

    it('should throw NotFoundError if the wanted user is not found', async () => {
      const { userService, userController } = makeSut();

      const id = 'fakeId';
      const httpRequest = createMockHttpRequest({ params: { id } });

      userService.findById.mockResolvedValue(null);

      await expect(userController.findById(httpRequest)).rejects.toThrow(NotFoundError);
      expect(userService.findById).toHaveBeenCalledWith(id);
    });
  });

  describe('updateById', () => {
    it('should update a user by id and return OK', async () => {
      const { userService, userController } = makeSut();

      const id = 'fakeId';
      const updateData: Partial<UpdateUserDTO> = {
        cpf: '144688588555',
      };
      const httpRequest = createMockHttpRequest({
        params: { id },
        body: updateData,
      });

      const expectedUser = UserMocker.mockUserDTOWithId();
      userService.updateById.mockResolvedValue(expectedUser);

      const response = await userController.updateById(httpRequest);

      expect(response).toMatchObject({
        status: HttpStatusCode.ok,
        data: expectedUser,
      });

      expect(userService.updateById).toHaveBeenCalledWith(id, updateData);
    });

    it('should throw BadRequest if no id was provided in the request params', async () => {
      const { userService, userController } = makeSut();

      const updateData: Partial<UpdateUserDTO> = {
        firstName: 'Joares',
      };
      const httpRequest = createMockHttpRequest({
        body: updateData,
      });

      await expect(userController.updateById(httpRequest)).rejects.toThrow(BadRequestError);
      expect(userService.updateById).not.toHaveBeenCalled();
    });

    it('should throw NotFoundError if the wanted user is not found', async () => {
      const { userService, userController } = makeSut();

      const id = 'fakeId';
      const updateData: Partial<UpdateUserDTO> = {
        firstName: 'Joares',
      };
      const httpRequest = createMockHttpRequest({ params: { id }, body: updateData });

      userService.updateById.mockResolvedValue(null);

      await expect(userController.updateById(httpRequest)).rejects.toThrow(NotFoundError);
      expect(userService.updateById).toHaveBeenCalledWith(id, updateData);
    });
  });

  describe('deleteById', () => {
    it('should delete a user by id and return OK', async () => {
      const { userService, userController } = makeSut();

      const id = 'fakeId';
      const httpRequest = createMockHttpRequest({ params: { id } });

      const expectedUser = UserMocker.mockUserDTOWithId();
      userService.deleteById.mockResolvedValue(expectedUser);

      const response = await userController.deleteById(httpRequest);

      expect(response).toMatchObject({
        status: HttpStatusCode.ok,
        data: expectedUser,
      });
      expect(userService.deleteById).toHaveBeenCalledWith(id);
    });

    it('should throw BadRequest if no id was provided in the request params', async () => {
      const { userService, userController } = makeSut();

      const httpRequest = createMockHttpRequest();

      await expect(userController.deleteById(httpRequest)).rejects.toThrow(BadRequestError);
      expect(userService.deleteById).not.toHaveBeenCalled();
    });

    it('should throw NotFoundError if the wanted user is not found', async () => {
      const { userService, userController } = makeSut();

      const id = 'fakeId';
      const httpRequest = createMockHttpRequest({ params: { id } });

      userService.deleteById.mockResolvedValue(null);

      await expect(userController.deleteById(httpRequest)).rejects.toThrow(NotFoundError);
      expect(userService.deleteById).toHaveBeenCalledWith(id);
    });
  });
});
