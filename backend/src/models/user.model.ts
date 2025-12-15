import { Schema, model, Document } from 'mongoose';
import { User } from '../types/User';

interface IUserModel extends User, Document {}

const UserSchema = new Schema<IUserModel>(
  {
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, required: true },
    cpf: { type: String, required: true },
    password: { type: String, required: true },
    role: {
      type: String,
      enum: ['lawyer', 'client', 'admin'],
      required: true,
    },
  },
  { timestamps: true }
);

export const UserModel = model<User>('User', UserSchema);
