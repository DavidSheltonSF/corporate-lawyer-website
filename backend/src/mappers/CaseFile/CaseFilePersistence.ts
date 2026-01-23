import { UserIdentityPersistence } from '../User/UserIdentityPersistence';

export type CaseFilePersistence = {
  _id: { toString(): string };
  name: string;
  url: string;
  size: number;
  mimeType: string;
  uploadedBy: UserIdentityPersistence;
  case: { toString(): string };
  uploadedAt: { toISOString(): string };
};
