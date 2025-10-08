import type { AuthToken, LoginCredentials, RegisterData } from "../models/Auth";
import type { User } from "../models/User";

export interface IAuthRepository {
    login(credentials: LoginCredentials): Promise<AuthToken>;
    signup(userData: RegisterData): Promise<User>;
}