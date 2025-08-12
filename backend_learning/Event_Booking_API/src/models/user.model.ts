import mongoose, { Document, Schema } from "mongoose";

export interface IUser extends Document{
    name: string;
    email: string;
    role: "user" | "organizer";
}

// creating schema of User
const userSchema: Schema = new Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    role: { type: String, enum: ["user", "organizer"], default: "user" },
});

// note can use generic <IUser> with Schema also
/*
const userSchema: Schema = new Schema<IUser>({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  role: { type: String, enum: ["user", "organizer"], default: "user" },
});
*/

export const UserModel = mongoose.model<IUser>('User', userSchema);