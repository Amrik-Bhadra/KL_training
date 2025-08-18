import { z } from "zod";

export const createUserSchema = z.object({
    firstName: z.string().min(1, 'First name is required'),
    lastName: z.string().min(1, 'Last name is required'),
    email: z.string().email("Invalid email address"),
    password: z.string().min(8, "Password must be at least 8 characters")
        .regex(/[A-Z]/, "Password must have at least one uppercase letter")
        .regex(/[a-z]/, "Password must have at least one lowercase letter")
        .regex(/\d/, "Password must have at least one digit")
        .regex(/[@$!%*?&]/, "Password must have at least one special character"),

    age: z.number().min(18, 'Age should be atleast 18'),
    phoneNumber: z.number(),
    city: z.string().min(1, "City is required"),
    state: z.string().min(1, "State is required"),
    country: z.string().min(1, "Country is required"),

    profilePic: z.any().optional(),
    cv: z.any().optional()
});

export type CreateUserDTO = z.infer<typeof createUserSchema>;