import { CreateFileDTO } from '../../../dtos/caseFile/CreateFileDTO';
import { ValidationError } from '../../../errors/presentation/ValidationError';
import { fileTypeFromBuffer } from 'file-type';

const MAX_FILE_SIZE = 10 * 1024 * 1024; //10 MB
const MIN_NAME_LENGTH = 2;
const MAX_NAME_LENGTH = 50;
const allowedFileTypes = ['application/pdf', 'image/png', 'image/jpeg'];

export async function validateFile(data: CreateFileDTO, buffer: Buffer) {
  const { name, size, mimeType } = data;
  const invalidFields: Partial<Record<keyof CreateFileDTO, string>> = {};

  const type = await fileTypeFromBuffer(buffer);

  if (!type || !allowedFileTypes.includes(mimeType)) {
    invalidFields.mimeType = 'Invalid file type';
  }

  if (name.trim().length < MIN_NAME_LENGTH || name.trim().length > MAX_NAME_LENGTH) {
    invalidFields.name = 'Invalid file name';
  }

  if (size > MAX_FILE_SIZE) {
    invalidFields.size = 'Max file size is 10 MB';
  }

  if (Object.keys(invalidFields).length > 0) {
    throw new ValidationError('Invalid File data', { invalidFields });
  }
}
