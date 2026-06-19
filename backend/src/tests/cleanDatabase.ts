import { FileModel } from '../models/FileModel';
import { CaseModel } from '../models/CaseModel';
import { NotificationModel } from '../models/NotificationModel';
import { UserModel } from '../models/UserModel';

export async function cleanDatabase() {
  await UserModel.deleteMany({});
  await CaseModel.deleteMany({});
  await FileModel.deleteMany({});
  await NotificationModel.deleteMany({});
}
