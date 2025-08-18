import { Document, Schema, model } from "mongoose";

enum Role {
    'user',
    'admin'
}

export interface IUser extends Document {
    username: string;
    email: string;
    password: string;
    role: Role,
    createdAt?: Date,
    updatedAt?: Date,
}

const userSchema = new Schema({
    username: { type: String, min: 5 },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true, min: 8 },
    role: { type: String, enum: ["user", "admin"], default: "user" }
}, { timestamps: true });

export const UserModel = model<IUser>('User', userSchema);

