import { Page } from '@/types/Page';
import { SafeUser } from '@/types/SafeUser';
import { User } from '@/types/User';
import { WithId } from '@/types/WithId';

export type UserPage = Page<WithId<User>>;
export type SafeUserPage = Page<WithId<SafeUser>>;
export interface GetUsersParams {
  search?: string;
  page: number;
  limit: number;
}
