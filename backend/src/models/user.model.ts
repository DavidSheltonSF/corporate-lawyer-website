import { Schema, model, Document } from 'mongoose';

export interface User extends Document {
  firstName: string;
  lastName: string;
  email: string;
  cpf: string;
  password: string;
  role: 'lawyer' | 'client' | 'admin';
}

const UserSchema = new Schema<User>(
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
