import { UserRepository } from "../repositories/user.repository";
import { CreateUserInput } from "../dtos/user.dto";
import { IUser } from "../models/user.model";

export class UserService {
    private userRepo = new UserRepository();
    
    async createUser(input: CreateUserInput){
        const existingUser = await this.userRepo.findUserByEmail(input.email);
        if(existingUser) throw new Error('User with this email already exists');

        return this.userRepo.createUser(input);
    }

    async getAllUsers(): Promise<IUser[] | null>{
        return await this.userRepo.getAllUsers();
    }
}