import { AuthRepository } from "../repositories/auth.repo";
import { publishToQueue } from "../rabbitmq/producer";
import { QUEUES } from "../rabbitmq/queues";
import { TEMPLATES } from "../rabbitmq/templates";
import { hashPassword, passwordCompare, signAccessToken, signRefreshToken, verifyRefreshToken } from "../utils/AuthHelpers";
import { generateOTP } from "../utils/HelperFunctions";
import crypto from "crypto";

export class AuthService {
    private authRepo = new AuthRepository();
    private rabbitMQUrl = process.env.RABBITMQ_URL || "amqp://guest:guest@localhost:5672";

    async signup(email: string, password: string) {
        const existing = await this.authRepo.findByEmail(email);
        if (existing) {
            throw new Error('User already exists');
        }

        const hash = await hashPassword(password)
        const user = await this.authRepo.createUser(email, hash);

        // Publish message to RabbitMQ queue for sending welcome email
        await publishToQueue(QUEUES.EMAIL, {
            email: user.email,
            name: user.name,
            template: TEMPLATES.welcome
        })

        return user;
    }

    async login(email: string, password: string) {
        const user = await this.authRepo.findByEmail(email);
        if (!user) {
            throw new Error('User not found');
        }

        const isMatch = await passwordCompare(password, user.password);
        if (!isMatch) {
            throw new Error('Invalid Credentials');
        }

        const { otp, expiry } = generateOTP();
        console.log('Otp', otp);
        console.log('Expiry', expiry);

        await this.authRepo.updateOtp(email, otp, expiry);

        await publishToQueue(QUEUES.OTP, {
            email: user.email,
            name: user.name,
            otp,
            template: TEMPLATES.otp
        });

        return { message: "OTP sent to email" };
    }

    async verifyOtp(email: string, otp: string) {
        const user = await this.authRepo.findByEmail(email);
        if (!user || !user.otp || !user.otpExpiry) throw new Error("OTP not found");

        if (user.otpExpiry < new Date()) throw new Error("OTP expired");
        if (user.otp !== otp) throw new Error("Invalid OTP");

        // Clear OTP
        await this.authRepo.clearOtp(email);

        // Generate JWT tokens
        const accessToken = signAccessToken({ userId: user.id });
        const refreshToken = signRefreshToken({ userId: user.id });
        return { accessToken, refreshToken };
    }

    async forgotPassword(email: string) {
        const user = await this.authRepo.findByEmail(email);
        if (!user) {
            return "If the email exists, a password reset link has been sent.";
        }

        // Generate reset token
        const rawToken = crypto.randomBytes(32).toString("hex");
        const hashedToken = crypto.createHash("sha256").update(rawToken).digest("hex");
        const expiry = new Date(Date.now() + 15 * 60 * 1000); // 15 minutes

        await this.authRepo.storeResetToken(email, hashedToken, expiry);

        // Send email asynchronously via RabbitMQ
        const resetLink = `http://localhost:4000/reset-password?token=${rawToken}&email=${encodeURIComponent(email)}`;

        await publishToQueue(QUEUES.EMAIL, {
            email,
            name: user.name,
            template: TEMPLATES.resetPassword,
            resetLink,
        });

        return "If the email exists, a password reset link has been sent.";
    }

    async resetPassword(email: string, token: string, newPassword: string) {
        const user = await this.authRepo.findByEmail(email);
        if (!user || !user.resetToken) {
            throw new Error("Invalid or expired reset link");
        }

        const hashToken = await crypto.createHash("sha256").update(token).digest('hex');

        if (hashToken !== user.resetToken) throw new Error("Invalid token");
        if (!user.resetTokenExpiry || user.resetTokenExpiry < new Date()) throw new Error("Token Expired");
        if (user.resetTokenUsed) throw new Error("Token already used");

        const hashedPassword = await hashPassword(newPassword);
        await this.authRepo.updatePasswordAfterReset(email, hashedPassword);
        await publishToQueue(QUEUES.EMAIL, {
            email,
            name: user.name,
            template: TEMPLATES.passwordChanged,
        });

        return "Password has been reset successfully.";
    }

    async refreshAccessToken(refreshToken: string) {
        const decoded = verifyRefreshToken(refreshToken);
        const user = await this.authRepo.findById(decoded.userId);

        if (!user) throw new Error("User not found");

        const newAccessToken = signAccessToken({ userId: user.id });
        const newRefreshToken = signRefreshToken({ userId: user.id });

        return { accessToken: newAccessToken, refreshToken: newRefreshToken };
    }

    async getUserProfile(userId: number) {
        const user = await this.authRepo.findById(userId);
        if (!user) throw new Error("User not found");
        return { id: user.id, name: user.name, email: user.email };
    }
}