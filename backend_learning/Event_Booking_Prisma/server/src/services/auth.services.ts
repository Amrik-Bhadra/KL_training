import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

import { CreateUserDTO } from "../dtos/user.dto";
import { UserRepository } from "../repositories/user.repository";

export class AuthService {
    private userRepository = new UserRepository();

    async register(data: CreateUserDTO) {
        const existingUser = await this.userRepository.getUserByEmail(data.email);
        if (!existingUser) throw new Error('User with this email already exisits');

        const hashedPassword = await bcrypt.hash(data.password, 10);
        const user = await this.userRepository.createUser({
            ...data,
            password: hashedPassword,
            role: "user"
        });

        const token = jwt.sign(
            { id: user.id, email: user.email, role: user.role },
            process.env.JWT_SECRET as string,
            { expiresIn: '1h' }
        );

        return { user, token };
    }

    async login(email: string, password: string) {
        const user = await this.userRepository.getUserByEmail(email);
        if (!user) throw new Error("User not found");

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) throw new Error('Invalid Credentials');

        const token = jwt.sign(
            { id: user.id, email: user.email, role: user.role },
            process.env.JWT_SECRET as string,
            { expiresIn: '1h' }
        );

        return { token };
    }
}