import { FileModel } from '../models/FileModel.js';
import { CaseModel } from '../models/CaseModel.js';
import { NotificationModel } from '../models/NotificationModel.js';
import { UserModel } from '../models/UserModel.js';

export async function cleanDatabase() {
  await UserModel.deleteMany({});
  await CaseModel.deleteMany({});
  await FileModel.deleteMany({});
  await NotificationModel.deleteMany({});

  await UserModel.syncIndexes();
  await CaseModel.syncIndexes();
  await FileModel.syncIndexes();
  await NotificationModel.syncIndexes();
}
