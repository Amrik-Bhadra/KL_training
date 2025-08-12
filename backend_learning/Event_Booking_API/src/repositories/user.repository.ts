import { UserModel, IUser } from "../models/user.model";

export class UserRepository {
    async createUser(user: Partial<IUser>): Promise<IUser> {
        const newUser = new UserModel(user);
        return await newUser.save();
    }

    async findUserByEmail(email: string): Promise<IUser | null> {
        const user = UserModel.findOne({ email });
        return user;
    }

    async getAllUsers(): Promise<IUser[] | null>{
        const users = UserModel.find();
        return users;
    }
}