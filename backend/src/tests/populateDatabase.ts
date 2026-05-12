import { fakeCases } from './fakeDatabase/cases';
import { fakeUserDatabase } from './fakeDatabase/users';
import { CaseModel } from '../models/CaseModel';
import { UserModel } from '../models/UserModel';
import { NotificationModel } from '../models/NotificationModel';
import { fakeNotifications } from './fakeDatabase/notifications';

export async function populateDatabase() {
  await UserModel.create(fakeUserDatabase);
  await CaseModel.create(fakeCases);
  await NotificationModel.create(fakeNotifications);
}
