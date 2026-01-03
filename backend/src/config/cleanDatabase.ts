import { CaseModel } from '../infra/mongodb/models/case.model';
import { UserModel } from '../infra/mongodb/models/user.model';

export async function cleanDatabase() {
  await UserModel.deleteMany({});
  await CaseModel.deleteMany({});
}
