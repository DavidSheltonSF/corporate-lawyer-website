import { fakeCases } from './fakeDatabase/cases.js';
import { fakeUserDatabase } from './fakeDatabase/users.js';
import { CaseModel } from '../models/CaseModel.js';
import { UserModel } from '../models/UserModel.js';
import { NotificationModel } from '../models/NotificationModel.js';
import { fakeNotifications } from './fakeDatabase/notifications.js';

export async function populateDatabase() {
  await UserModel.create(fakeUserDatabase);
  await CaseModel.create(fakeCases);
  await NotificationModel.create(fakeNotifications);
}
