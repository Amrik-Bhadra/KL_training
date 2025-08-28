'use server';

import { loginSchema, LoginUserDTO, RegisterUserDTO } from "@/lib/dtos/auth.dto";
import * as UserService from "@/services/user.services";
import * as UserRepository from "@/repositories/user.repository";
import { SignJWT } from "jose";
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

export interface AuthState {
  message: string | null;
  success: boolean;
}

export async function register(prevState: AuthState, formData: RegisterUserDTO): Promise<AuthState> {
  try {
    await UserService.registerUser(formData);
    return { message: 'Registration successful! Please log in.', success: true };
  } catch (error: any) {
    return { message: error.message, success: false };
  }
}

export async function login(prevState: AuthState, formData: LoginUserDTO): Promise<AuthState> {
  
  // 1. Validate data with DTO
  const validatedFields = loginSchema.safeParse(formData);
  if (!validatedFields.success) {
    // CORRECTED: Use .issues instead of .errors
    return { message: validatedFields.error.issues[0].message, success: false };
  }

  const { email, password } = validatedFields.data;

  try {
    // 2. Find user
    const user = await UserRepository.findUserByEmail(email);
    if (!user) {
      return { message: 'Invalid email or password.', success: false };
    }

    // 3. Compare passwords
    const isPasswordMatch = await user.comparePassword(password);
    if (!isPasswordMatch) {
      return { message: 'Invalid email or password.', success: false };
    }

    // 4. Create JWT session token
    const secret = new TextEncoder().encode(process.env.JWT_SECRET!);
    const token = await new SignJWT({ userId: user._id, email: user.email, username: user.username })
      .setProtectedHeader({ alg: 'HS256' })
      .setExpirationTime('24h')
      .setIssuedAt()
      .sign(secret);

    // 5. Set cookie
    cookies().set('session', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      maxAge: 60 * 60 * 24, // 24 hours
      path: '/',
    });

  } catch (error) {
    console.error(error);
    return { message: 'An unexpected error occurred.', success: false };
  }
  
  // 6. Redirect on success
  redirect('/dashboard');
}

export async function logout() {
    'use server';
    cookies().delete('session');
    redirect('/login');
}