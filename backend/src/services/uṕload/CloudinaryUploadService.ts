import cloudinary from '../../config/cloudinary';
import { UploadResult, UploadService } from './UploadService';

export class CloudinaryUploadService implements UploadService {
  async upload(buffer: Buffer): Promise<UploadResult> {
    return new Promise((resolve, reject) => {
      cloudinary.uploader
        .upload_stream({ resource_type: 'auto', folder: 'cases' }, (error, uploadResult) => {
          if (error) {
            return reject(error);
          }

          if (!uploadResult) {
            return Error('Invalid upload response');
          }

          const downloadUrl = cloudinary.url(uploadResult.public_id, {
            flags: 'attachment',
          });

          return resolve({
            url: uploadResult.secure_url,
            downloadUrl,
            publicId: uploadResult.public_id,
          });
        })
        .end(buffer);
    });
  }

  async delete(publicId: string): Promise<void> {
    const result = await cloudinary.uploader.destroy(publicId);
  }
  async deleteMany(publicIds: string[]): Promise<{ failedCount: number }> {
    const result = await cloudinary.api.delete_resources(publicIds);
    const failed = Object.entries(result).filter(([_, status]) => status !== 'deleted');

    return { failedCount: failed.length };
  }
}
