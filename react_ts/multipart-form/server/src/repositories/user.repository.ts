import User, { IUser } from "../models/user.model";

export class UserRepository{
    async createUser(userData: Partial<IUser>): Promise<IUser> {
        const newUser =  new User(userData);
        return newUser.save();
    }

    async findUserByEmail(email: string): Promise<IUser | null> {
        return await User.findOne({ email });
    }
}

export const userRepository = new UserRepository();