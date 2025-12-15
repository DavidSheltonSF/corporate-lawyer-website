import { Schema, model, Document } from 'mongoose';
import { User } from '../types/User';
import bcrypt from 'bcrypt';

interface IUserModel extends User, Document {}

const UserSchema = new Schema<IUserModel>(
  {
    firstName: { type: String, required: true, trim: true },
    lastName: { type: String, required: true, trim: true },
    email: { type: String, required: true, unique: true, lowercase: true, trim: true },
    cpf: { type: String, required: true, unique: true, trim: true },
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
