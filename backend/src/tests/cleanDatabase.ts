import { CaseModel } from '../models/CaseModel';
import { UserModel } from '../models/user.model';

export async function cleanDatabase() {
  await UserModel.deleteMany({});
  await CaseModel.deleteMany({});
}
