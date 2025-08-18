import { Schema, model, Document } from 'mongoose';

export interface IUser extends Document {
    _id: string;
    email: string;
    name?: string;
    password: string;
    role: 'user' | 'admin';
    refreshTokenHash?: string | null;
    createdAt?: Date;
    updatedAt?: Date;
}

const UserSchema = new Schema<IUser>({
    email: { type: String, required: true, unique: true, index: true },
    name: { type: String },
    password: { type: String, required: true },
    role: { type: String, enum: ['user', 'admin'], default: 'user' },
    refreshTokenHash: { type: String, default: null },
}, { timestamps: true });

export const User = model<IUser>('User', UserSchema);
