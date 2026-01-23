import { CaseFileModel } from '../models/CaseFileModel';
import { CaseModel } from '../models/CaseModel';
import { UserModel } from '../models/UserModel';

export async function cleanDatabase() {
  await UserModel.deleteMany({});
  await CaseModel.deleteMany({});
  await CaseFileModel.deleteMany({});
}
