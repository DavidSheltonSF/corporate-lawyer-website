import { UserIdentityPersistence } from '../User/UserIdentityPersistence';

export type CaseFilePersistence = {
  _id: { toString(): string };
  name: string;
  url: string;
  uploadedBy: UserIdentityPersistence;
  uploadedAt: { toISOString(): string };
};
