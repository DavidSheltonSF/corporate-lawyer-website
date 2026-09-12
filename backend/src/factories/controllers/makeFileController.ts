import { IFileController } from '../../controllers/file/IFileController.js';
import { FileController } from '../../controllers/file/FileController.js';
import { MongodbFileRepository } from '../../database/mongoDB/repositories/MongodbFileRepository.js';
import { FileService } from '../../services/files/FileService.js';
import { CloudinaryUploadService } from '../../services/uṕload/CloudinaryUploadService.js';

export function makeFileController(): IFileController {
  const fileRepository = new MongodbFileRepository();
  const uplaodService = new CloudinaryUploadService();
  const fileService = new FileService(fileRepository, uplaodService);
  return new FileController(fileService);
}
