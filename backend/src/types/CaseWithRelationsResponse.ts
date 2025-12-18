import { Case } from './Case';
import { User } from './User';
import { WithId } from './WithId';

export type CaseWithRelations = Case & {
  client?: WithId<Pick<User, 'firstName' | 'lastName'>>;
  lawyers?: WithId<Pick<User, 'firstName' | 'lastName'>>[];
};
