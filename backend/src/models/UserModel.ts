import { Schema, model, Document } from 'mongoose';
import bcrypt from 'bcrypt';
import { UserRole } from '../types/UserRole';

export interface IUserModel {
  firstName: string;
  lastName: string;
  email: string;
  cpf: string;
  password: string;
  role: UserRole;
  createdAt?: Date;
  updatedAt?: Date;
}

interface UserMongoDocument extends IUserModel, Document {}

const UserSchema = new Schema<UserMongoDocument>(
  {
    firstName: { type: String, required: true, trim: true },
    lastName: { type: String, required: true, trim: true },
    email: { type: String, required: true, unique: true, lowercase: true, trim: true },
    cpf: { type: String, required: true, unique: true, trim: true },
    password: { type: String, required: true },
    role: {
      type: String,
      enum: Object.values(UserRole),
      required: true,
    },
  },
  { timestamps: true }
);

UserSchema.pre('save', async function () {
  if (this.isModified('password')) {
    const salt = 10;
    this.password = await bcrypt.hash(this.password, salt);
  }
});

export const UserModel = model<UserMongoDocument>('Users', UserSchema);
