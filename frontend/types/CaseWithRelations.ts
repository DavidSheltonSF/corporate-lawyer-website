import { CaseProps } from './CaseProps';
import { UserProps } from './UserProps';
import { WithId } from './WithId';

export type CaseWithRelations = CaseProps & {
  client?: WithId<Pick<UserProps, 'firstName' | 'lastName'>>;
  lawyers?: WithId<Pick<UserProps, 'firstName' | 'lastName'>>[];
};
