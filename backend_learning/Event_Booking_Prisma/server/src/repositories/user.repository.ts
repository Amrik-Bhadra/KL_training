import { PrismaClient, User } from "../../generated/prisma";
import { CreateUserDTO, UpdateUserDTO } from "../dtos/user.dto";

const prisma = new PrismaClient();

export class UserRepository {

    async createUser(user: CreateUserDTO): Promise<User> {
        return prisma.user.create({ data: user });
    }

    async getUserById(id: number): Promise<User | null> {
        return prisma.user.findUnique({
            where: { id }
        });
    }

    async getUserByEmail(email: string): Promise<User | null> {
        return prisma.user.findUnique({
            where: { email }
        });
    }

    async updateUser(id: number, user: UpdateUserDTO): Promise<User> {
        return prisma.user.update({
            where: { id },
            data: user
        });
    }

    async deleteUser(id: number): Promise<User>{
        return prisma.user.delete({
            where: { id }
        });
    }

    async getAllUsers(): Promise<User[]> {
        return prisma.user.findMany();
    }
}