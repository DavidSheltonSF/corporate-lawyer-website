export interface UploadResult {
  url: string;
  download_url: string;
  publicId: string;
}

export interface UploadService {
  upload: (buffer: Buffer) => Promise<UploadResult>;
  delete: (publicId: string) => Promise<void>;
}
