import { ObjectId } from 'mongoose';
import { Case } from './Case';
import { User } from './User';

export type CaseWithRelations = Case & {
  client?: { _id: ObjectId } & Pick<User, 'firstName' | 'lastName'>;
  lawyers?: { _id: ObjectId } & Pick<User, 'firstName' | 'lastName'>[];
};
