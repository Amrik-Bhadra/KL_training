import { z } from "zod";

export const createTodoSchema = z.object({
    title: z.string().min(4, 'title must be of atleast 4 characters'),
    description: z.string().min(4, 'description must be of atleast 4 characters'),
    isComplete: z.boolean().optional()
});

export const updateTodoSchema = z.object({
    title: z.string().min(4, 'title must be of atleast 4 characters').optional(),
    description: z.string().min(4, 'description must be of atleast 4 characters').optional(),
    isComplete: z.boolean().optional()
});

export type CreateTodoInput = z.infer<typeof createTodoSchema>;
export type UpdateTodoInput = z.infer<typeof updateTodoSchema>;
