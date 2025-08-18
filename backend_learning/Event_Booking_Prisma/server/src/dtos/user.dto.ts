import { z } from "zod";

export const createUserSchema = z.object({
    name: z.string().min(1, 'Name should have atleast 1 charcter'),
    email: z.string().email('Provide correct email'),
    password: z.string().min(8, 'Password should be minimum of 8 characters'),
    role: z.enum(['user', 'organizer']).default('user')
});

export const updateUserSchema = z.object({
    name: z.string().min(1, 'Name should have atleast 1 charcter').optional(),
    password: z.string().min(8, 'Password should be minimum of 8 characters').optional()
});

export type CreateUserDTO = z.infer<typeof createUserSchema>;
export type UpdateUserDTO = z.infer<typeof updateUserSchema>;