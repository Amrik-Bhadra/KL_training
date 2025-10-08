import type { IAuthRepository } from "@/domain/repositories/IAuthRepository";
import type { LoginCredentials } from "@/domain/models/Auth";

export const loginUserUseCase = (authRepository: IAuthRepository) => {
    return (credentials: LoginCredentials) => {
        if(!credentials.email || !credentials.password){
            throw new Error('Email and password required!');
        }

        return authRepository.login(credentials);
    }
}