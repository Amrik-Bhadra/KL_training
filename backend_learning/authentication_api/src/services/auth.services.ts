import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { ApiError } from "../utils/ApiError";
import { UserRepository } from "../repositories/user.repository";
import { LoginDTO, RegisterDTO } from "../dtos/auth.dto";
import { env } from "../config/env";
import crypto from "crypto";

const SALT_ROUNDS = 12;

export class AuthService {
    private userRepository = new UserRepository();

    async register(userData: RegisterDTO) {
        const existingUser = await this.userRepository.findByEmail(userData.email);
        if (existingUser) throw new ApiError(409, 'User already exists');

        const hashedPassword = await bcrypt.hash(userData.password, SALT_ROUNDS);
        const newUser = await this.userRepository.create({ email: userData.email, password: hashedPassword, name: userData.name, role: userData.role });

        return { id: newUser._id, email: newUser.email, name: newUser.name, role: newUser.role };
    }

    async login(userData: LoginDTO) {
        const user = await this.userRepository.findByEmail(userData.email);
        if (!user) throw new ApiError(404, 'User not found!');

        const isMatch = await bcrypt.compare(userData.password, user.password);

        if (!isMatch) throw new ApiError(401, "Invalid Credentials");

        const payload = {
            id: String(user._id),
            role: user.role
        }

        // generate tokens
        const accessToken = jwt.sign(payload, env.JWT_ACCESS_SECRET, { expiresIn: '1h' });
        const refreshToken = jwt.sign(payload, env.JWT_REFRESH_SECRET, { expiresIn: '7d' });

        // hash the refresh token
        const hashedRefreshToken = this.hashToken(refreshToken);
        await this.userRepository.setRefreshHash(String(user._id), hashedRefreshToken);

        return {
            user: { id: user._id, email: user.email, name: user.name, role: user.role },
            accessToken,
            refreshToken
        }
    }

    async rotateRefresh(oldToken: string) {
        // verify first (throws if invalid)
        const payload: any = jwt.verify(oldToken, env.JWT_REFRESH_SECRET) as any;
        const userId = payload.sub;
        const user = await this.userRepository.findById(userId);
        if (!user || !user.refreshTokenHash) throw new ApiError(401, 'Invalid refresh token');

        // compare stored hash with old token
        const oldHash = user.refreshTokenHash;
        if (oldHash !== this.hashToken(oldToken)) {
            // token mismatch -> revoke
            await this.userRepository.setRefreshHash(String(user._id), null);
            throw new ApiError(401, 'Invalid refresh token');
        }

        // issue new tokens
        const newPayload = {
            id: String(user._id),
            role: user.role
        }

        // generate tokens
        const accessToken = jwt.sign(newPayload, env.JWT_ACCESS_SECRET, { expiresIn: '1h' });
        const refreshToken = jwt.sign(newPayload, env.JWT_REFRESH_SECRET, { expiresIn: '7d' });

        // store new refresh hash
        await this.userRepository.setRefreshHash(String(user._id), this.hashToken(refreshToken));

        return { accessToken, refreshToken, user: { id: user._id, email: user.email, name: user.name, role: user.role } };
    }


    async logout(userId: string) {
        await this.userRepository.setRefreshHash(userId, null);
    }


    private hashToken(token: string) {
        return crypto.createHash('sha256').update(token).digest('hex');
    }
}   