import { IsEmail, IsString, MinLength, Length } from "class-validator";

export class SignUpDTO {
    @IsEmail({}, { message: "Invalid email address" })
    email!: string;

    @IsString({ message: "Password must be a string" })
    @MinLength(6, { message: "Password must be at least 6 characters long" })
    password!: string;
}

export class LoginDTO {
    @IsEmail()
    email!: string;

    @IsString()
    @MinLength(6)
    password!: string;
}

export class VerifyOTP {
    @IsEmail()
    email!: string;

    @IsString()
    @Length(6, 6)
    otp!: string; // assuming 6-digit OTP
}