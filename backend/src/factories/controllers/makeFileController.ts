import { IFileController } from '../../controllers/file/IFileController';
import { FileController } from '../../controllers/file/FileController';
import { MongodbFileRepository } from '../../database/mongoDB/repositories/MongodbFileRepository';
import { FileService } from '../../services/files/FileService';
import { CloudinaryUploadService } from '../../services/uṕload/CloudinaryUploadService';

export function makeFileController(): IFileController {
  const fileRepository = new MongodbFileRepository();
  const uplaodService = new CloudinaryUploadService();
  const fileService = new FileService(fileRepository, uplaodService);
  return new FileController(fileService);
}
