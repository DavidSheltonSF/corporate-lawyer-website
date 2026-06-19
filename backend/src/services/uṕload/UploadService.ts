export interface UploadResult {
  url: string;
  downloadUrl: string;
  publicId: string;
}

export interface UploadService {
  upload: (buffer: Buffer) => Promise<UploadResult>;
  delete: (publicId: string) => Promise<void>;
  deleteMany: (publicIdS: string[]) => Promise<{ failedCount: number }>;
}
