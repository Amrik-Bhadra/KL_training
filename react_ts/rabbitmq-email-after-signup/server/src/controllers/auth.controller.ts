import { Request, Response } from "express";
import { plainToInstance } from "class-transformer";
import { AuthService } from "../services/auth.service";
import { LoginDTO, SignUpDTO } from "../dto/auth.dto";
import { validate } from "class-validator";

const authService = new AuthService();

export class AuthController {

    static async signup(req: Request, res: Response) {
        const dto = plainToInstance(SignUpDTO, req.body);
        const errors = await validate(dto);
        if (errors.length > 0) {
            return res.status(400).json({ errors });
        }

        try {
            const user = await authService.signup(dto.email, dto.password);
            return res.status(201).json({ message: 'Signup successful', data: user });
        } catch (error: any) {
            return res.status(400).json({ message: error.message });
        }
    }

    static async login(req: Request, res: Response) {
        const dto = plainToInstance(LoginDTO, req.body);
        const errors = await validate(dto);
        if (errors.length > 0) {
            return res.status(400).json({ errors });
        }

        try {
            const result = await authService.login(dto.email, dto.password);
            return res.status(200).json(result);
        } catch (error: any) {
            return res.status(400).json({ message: error.message });
        }
    }

    static async verifyOtp(req: Request, res: Response) {
        try {
            const { email, otp } = req.body;
            if (!email || !otp) {
                return res.status(400).json({ message: "Email and OTP are required" });
            }

            const { accessToken, refreshToken } = await authService.verifyOtp(email, otp);

            res.cookie("refreshToken", refreshToken, {
                httpOnly: true,
                secure: process.env.NODE_ENV === "production",
                sameSite: "strict",
                maxAge: 7 * 24 * 60 * 60 * 1000,
            });

            return res.status(200).json({
                message: "OTP verified successfully",
                accessToken,
            });
        } catch (error: any) {
            return res.status(400).json({ message: error.message });
        }
    }

    static async logout(req: Request, res: Response) {
        try {
            res.clearCookie("refreshToken", {
                httpOnly: true,
                secure: process.env.NODE_ENV === "production",
                sameSite: "strict",
            });

            return res.status(200).json({ message: "Logged out successfully" });
        } catch (error: any) {
            return res.status(400).json({ message: error.message });
        }
    }

    static async forgotPassword(req: Request, res: Response) {
        try {
            const email = req.body;
            if (!email) {
                return res.status(400).json({ message: 'Email is required' });
            }

            const result = await authService.forgotPassword(email);
            return res.status(200).json({ message: result });
        } catch (error: any) {
            return res.status(500).json({ message: error.message || "Internal Server Error" });
        }
    }

    static async resetPassword(req: Request, res: Response) {
        try {
            const { email, token, newPassword } = req.body;

            if (!email || !token || !newPassword) {
                return res.status(400).json({ message: "All fields are required" });
            }

            const result = await authService.resetPassword(email, token, newPassword);
            return res.status(200).json({ message: result });
        } catch (error: any) {
            return res.status(500).json({ message: error.message || "Internal Server Error" });
        }
    }

    static async refreshToken(req: Request, res: Response) {
        try {
            const token = req.cookies.refreshToken;
            if (!token) return res.status(401).json({ message: "No refresh token provided" });

            const { accessToken, refreshToken } = await authService.refreshAccessToken(token);

            // Update cookie with new refresh token
            res.cookie("refreshToken", refreshToken, {
                httpOnly: true,
                secure: process.env.NODE_ENV === "production",
                sameSite: "strict",
                maxAge: 7 * 24 * 60 * 60 * 1000
            });

            return res.status(200).json({ accessToken });
        } catch (error: any) {
            return res.status(403).json({ message: error.message });
        }
    }

    static async me(req: Request, res: Response) {
        try {
            const userId = (req as any).user?.id; // added by middleware
            if (!userId) return res.status(401).json({ message: "Unauthorized" });

            const user = await authService.getUserProfile(userId);
            return res.status(200).json({ user });
        } catch (error: any) {
            return res.status(400).json({ message: error.message });
        }
    }


}
