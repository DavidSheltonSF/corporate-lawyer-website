import { Case } from './Case';
import { User } from './User';
import { WithId } from './WithId';

export type CaseWithRelations = Omit<Case, 'clientId' | 'lawyerId'> & {
  client: WithId<Pick<User, 'firstName' | 'lastName'>>;
  lawyer: WithId<Pick<User, 'firstName' | 'lastName'>>;
};
