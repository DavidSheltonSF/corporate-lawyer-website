import { afterAll, beforeAll, beforeEach, describe, expect, it } from 'vitest';
import { MongodbFileRepository } from './MongodbFileRepository.js';
import { FileModel } from '../../../models/FileModel.js';
import { FileMocker } from '../../../tests/mocks/entities/FileMocker.js';
import { GenericMocker } from '../../../tests/mocks/fields/GenericMocker.js';
import { UserMocker } from '../../../tests/mocks/entities/UserMocker.js';
import { UserModel } from '../../../models/UserModel.js';
import { MongodbTestConnector } from '../MongodbTestConnector.js';

describe(`Test ${MongodbFileRepository.name}`, () => {
  let connection: MongodbTestConnector | null;
  beforeAll(async () => {
    connection = await MongodbTestConnector.connectAndReturn(MongodbFileRepository.name);
  });

  beforeEach(async () => {
    await FileModel.deleteMany({});
  });

  afterAll(async () => {
    await connection?.deleteDatabase();
    await connection?.disconnect();
  });

  async function makeSut() {
    const fileRepository = new MongodbFileRepository();

    const user = UserMocker.mockUserDTO();
    const userId = (await UserModel.create({ ...user }))._id.toString();

    return {
      fileRepository,
      userId,
    };
  }

  describe('create', () => {
    it('should create a new file', async () => {
      const { fileRepository } = await makeSut();
      const file = FileMocker.mockFileDTO();
      const createdFile = await fileRepository.create(file);

      expect(createdFile.name).toBe(file.name);
      expect(createdFile.ownerId.toString()).toBe(file.ownerId);
      expect(createdFile.mimeType).toBe(file.mimeType);
      expect(createdFile.publicId).toBe(file.publicId);
      expect(createdFile.size).toBe(file.size);
      expect(createdFile.url).toBe(file.url);
      expect(createdFile.downloadUrl).toBe(file.downloadUrl);
    });
  });

  describe('findById', () => {
    it('should return all files by id', async () => {
      const { fileRepository } = await makeSut();
      const file1 = FileMocker.mockFileDTO();
      const file2 = FileMocker.mockFileDTO();

      const fileId = (await FileModel.create(file1))._id;
      await FileModel.create(file2);

      const foundFile = await fileRepository.findById(fileId.toString());

      expect(foundFile?.name).toBe(file1.name);
      expect(foundFile?.ownerId.toString()).toBe(file1.ownerId);
      expect(foundFile?.mimeType).toBe(file1.mimeType);
      expect(foundFile?.publicId).toBe(file1.publicId);
      expect(foundFile?.size).toBe(file1.size);
      expect(foundFile?.url).toBe(file1.url);
      expect(foundFile?.downloadUrl).toBe(file1.downloadUrl);
    });

    it('should return null if file is not found id', async () => {
      const { fileRepository } = await makeSut();
      const foundFile = await fileRepository.findById(GenericMocker.mockMongoId().toString());
      expect(foundFile).toBeNull();
    });
  });

  describe('findByOwnerId', () => {
    it('should return a page of files by owner id', async () => {
      const { fileRepository, userId } = await makeSut();
      const file1 = FileMocker.mockFileDTO();
      file1.uploadedBy = userId;

      const file2 = FileMocker.mockFileDTO();

      await FileModel.create([file1, file2]);

      const limit = 4;
      const page = 1;
      const { items, meta } = await fileRepository.findByOwnerId(file1.ownerId, { page, limit });

      expect(items).toEqual([
        expect.objectContaining({
          name: file1.name,
          ownerId: file1.ownerId,
          mimeType: file1.mimeType,
          publicId: file1.publicId,
          size: file1.size,
          url: file1.url,
          downloadUrl: file1.downloadUrl,
        }),
      ]);

      expect(meta).toMatchObject({
        currentPage: 1,
        totalItems: 1,
        nextPage: null,
        totalPages: 1,
      });
    });
  });

  describe('renane', () => {
    it('should rename a file by its id and return true', async () => {
      const { fileRepository } = await makeSut();
      const file = FileMocker.mockFileDTO();

      const fileId = (await FileModel.create(file))._id.toString();

      const newName = 'file-new-name';
      const renamed = await fileRepository.rename(fileId, newName);
      expect(renamed).toBeTruthy();

      const renamedFile = await FileModel.findById(fileId);
      expect(renamedFile?.name).toBe(newName);
    });

    it('should return false if file is not found', async () => {
      const { fileRepository } = await makeSut();

      const fileId = GenericMocker.mockMongoId().toString();
      const newName = 'file-new-name';
      const renamed = await fileRepository.rename(fileId, newName);

      expect(renamed).toBeFalsy();
    });
  });

  describe('deleteById', () => {
    it('should  delete a file by its id', async () => {
      const { fileRepository } = await makeSut();
      const file = FileMocker.mockFileDTO();

      const fileId = (await FileModel.create(file))._id.toString();

      await fileRepository.deleteById(fileId);

      const deleted = await FileModel.findById(fileId);

      expect(deleted).toBeNull();
    });

    it('should return null if file is not found', async () => {
      const { fileRepository } = await makeSut();

      const fileId = GenericMocker.mockMongoId().toString();
      const deleted = await fileRepository.deleteById(fileId);

      expect(deleted).toBeFalsy();
    });
  });

  describe('deleteByOwneriD', () => {
    it('should  delete a file by its id', async () => {
      const { fileRepository, userId } = await makeSut();
      const file = FileMocker.mockFileDTO();
      file.ownerId = userId;

      const fileId = (await FileModel.create(file))._id.toString();

      await fileRepository.deleteByOwnerId(userId);

      const deleted = await FileModel.findById(fileId);

      expect(deleted).toBeNull();
    });

    it('should return null if file is not found', async () => {
      const { fileRepository } = await makeSut();

      const fileId = GenericMocker.mockMongoId().toString();
      const deleted = await fileRepository.deleteById(fileId);

      expect(deleted).toBeFalsy();
    });
  });
});
