import * as UserRepository from "@/repositories/user.repository";
import { registerSchema, RegisterUserDTO } from "@/lib/dtos/auth.dto";

export async function registerUser(formData: RegisterUserDTO) {
    const validatedFields = registerSchema.safeParse(formData);
    if (!validatedFields.success) {
        throw new Error(validatedFields.error.issues[0].message);
    }

    const { username, email, password } = validatedFields.data;
    const existingEmail = await UserRepository.findUserByEmail(email);
    if (existingEmail) {
        throw new Error('User with this email already exists.');
    }

    const existingUsername = await UserRepository.findUserByUsername(username);
    if (existingUsername) {
        throw new Error('This username is already taken.');
    }

    // 3. Create user via repository
    return UserRepository.createUser({ username, email, password });
}   

