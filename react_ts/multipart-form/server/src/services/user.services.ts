import bcrypt from "bcryptjs";
import { userRepository } from "../repositories/user.repository"
import { CreateUserDTO } from "../dtos/user.dto"
import { IUser } from "../models/user.model"

export class UserService {
    async registerUser(data: CreateUserDTO & { profilePic: string, cv: string }): Promise<Omit<IUser, "password">> {
        const existingUser = await userRepository.findUserByEmail(data.email);
        if(existingUser) throw new Error('User already exists');

        // hash password
        const hashedPassword = await bcrypt.hash(data.password, 10);

        const newUser = await userRepository.createUser({
            firstName: data.firstName,
            lastName: data.lastName,
            email: data.email,
            password: hashedPassword,
            age: data.age,
            phoneNumber: data.phoneNumber,
            address: {
                city: data.city,
                state: data.state,
                country: data.country
            },
            profilePic: data.profilePic,
            cv: data.cv,
        });

        const userObj = newUser.toObject();
        delete userObj.password;
        return userObj;
    }
}


export const userService = new UserService();