import  type { IAuthRepository } from '@/domain/repositories/IAuthRepository';
import type { RegisterData } from '@/domain/models/Auth';

export const signupUsecase = (authRepository: IAuthRepository) => {
    return (userData: RegisterData) => {
        if(!userData.name || !userData.email || !userData.password){
            throw new Error("Name, email, and password are required for signup.");
        }

        return authRepository.signup(userData);
    }
}