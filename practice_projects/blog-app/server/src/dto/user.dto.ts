import { z } from "zod";

export const registerSchema = z.object({
    username: z.string().min(2, 'Username should have atleast 2 characters'),
    email: z.email(),
    password: z.string().min(8, 'Password should have atleast 8 characters'),
    role: z.enum(["user", "admin"]),
});

export const loginSchema = z.object({
    email: z.email().optional(),
    password: z.string().min(8, 'Password should have atleast 8 characters').optional(),
});

export type RegisterDTO = z.infer<typeof registerSchema>
export type LoginDTO = z.infer<typeof loginSchema>