import { PrismaClient, User } from "@prisma/client";

const prisma = new PrismaClient();

export class AuthRepository {
    async createUser(email: string, password: string): Promise<User> {
        return prisma.user.create({
            data: {
                email,
                password
            }
        });
    }

    async updateOtp(email: string, otp: string, expiry: Date) {
        return prisma.user.update({
            where: { email },
            data: { otp, otpExpiry: expiry }
        });
    }

    async findByEmail(email: string): Promise<User | null> {
        return prisma.user.findUnique({
            where: {
                email
            }
        });
    }

    async findById(id: number): Promise<User | null> {
        return prisma.user.findUnique({
            where: {
                id
            }
        });
    }

    async clearOtp(email: string) {
        return prisma.user.update({
            where: { email },
            data: { otp: null, otpExpiry: null }
        });
    }

    async storeResetToken(email: string, resetTokenHash: string, resetTokenExpiry: Date) {
        return prisma.user.update({
            where: { email },
            data: {
                resetToken: resetTokenHash,
                resetTokenExpiry,
            },
        });
    }

    async updatePasswordAfterReset(email: string, newPassword: string) {
        return prisma.user.update({
            where: { email },
            data: {
                password: newPassword,
                resetToken: null,
                resetTokenExpiry: null,
                resetTokenUsed: true,
            },
        });
    }
}