import { z } from "zod";

export const createTodoSchema = z.object({
    text: z.string().min(1, { message: "Text cannot be empty" }),
});

export const updateTodoSchema = z.object({
    text: z.string().min(1, { message: "Text cannot be empty" }).optional(),
    completed: z.boolean().optional()
});

export type CreateTodoDTO = z.infer<typeof createTodoSchema>;
export type UpdateTodoDTO = z.infer<typeof updateTodoSchema>;