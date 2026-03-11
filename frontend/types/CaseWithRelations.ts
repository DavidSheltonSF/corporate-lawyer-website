import { Case } from './Case';
import { User } from './User';
import { WithId } from './WithId';

export type CaseWithRelations = Omit<Case, 'clientId' | 'lawyersIds'> & {
  client: WithId<Pick<User, 'firstName' | 'lastName'>>;
  lawyers: WithId<Pick<User, 'firstName' | 'lastName'>>[];
};
