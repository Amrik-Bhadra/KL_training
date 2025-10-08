import type { AuthToken, LoginCredentials, RegisterData } from "@/domain/models/Auth";
import apiClient from "../services/apiClient";
import type { IAuthRepository } from "@/domain/repositories/IAuthRepository";
import type { User } from "@/domain/models/User";

export class AuthRepository implements IAuthRepository {
    async login(credentials: LoginCredentials): Promise<AuthToken> {
        try {
            const response = await apiClient.post<AuthToken>('/auth/login', credentials);
            if (response.data && response.data.accessToken) {
                localStorage.setItem('authToken', response.data.accessToken);
            }

            return response.data;
        } catch (error) {
            console.error('Login failed in repository:', error);
            throw error;
        }
    }

    async signup(userData: RegisterData): Promise<User> {
        try {
            const response = await apiClient.post<User>('/auth/register', userData);
            return response.data;
        } catch (error) {
            console.error('Registration Failed', error);
            throw error;
        }
    }
}