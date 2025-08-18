import mongoose, { Schema, Document } from "mongoose";

export interface IUser extends Document {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    address: {
        city: string;
        state: string;
        country: string;
    };
    age: number;
    phoneNumber: number;
    profilePic: string;
    cv: string;
};

const userSchema = new Schema({
    firstName: { type: String, required: true, trim: true },
    lastName: { type: String, required: true, trim: true },
    email: { type: String, required: true, unique: true, trim: true },
    password: { type: String, required: true, trim: true },
    address: {
        city: { type: String, required: true, trim: true },
        state: { type: String, required: true, trim: true },
        country: { type: String, required: true, trim: true }
    },
    age: { type: Number, required: true, min: 18 },
    phoneNumber: { type: Number, required: true },
    profilePic: { type: String, required: true },
    cv: { type: String, required: true }
}, { timestamps: true });

const User = mongoose.model<IUser>('User', userSchema);
export default User;