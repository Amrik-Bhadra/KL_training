import User from "@/lib/models/User";
import dbConnect from "@/lib/db";

export async function findUserByEmail(email: string) {
    await dbConnect();
    return await User.findOne({ email });
}

export async function findUserByUsername(username: string) {
    await dbConnect();
    return await User.findOne({ username });
}

export async function createUser(userData: { username: string; email: string; password: string }) {
    await dbConnect();
    const user = new User(userData);
    return user.save();
}