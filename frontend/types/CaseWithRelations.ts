import { Case } from './Case';
import { UserProps } from './UserProps';
import { WithId } from './WithId';

export type CaseWithRelations = Case & {
  client?: WithId<Pick<UserProps, 'firstName' | 'lastName'>>;
  lawyers?: WithId<Pick<UserProps, 'firstName' | 'lastName'>>[];
};
