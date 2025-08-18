import { z } from "zod";

export const createBookingSchema = z.object({
    userId: z.number().int().positive("User ID must be a positive integer"),
    eventId: z.number().int().positive("Event ID must be a positive integer"),
});

export const updateBookingSchema = z.object({
    userId: z.number().int().positive("User ID must be a positive integer").optional(),
    eventId: z.number().int().positive("Event ID must be a positive integer").optional(),
});

export type CreateBookingDTO = z.infer<typeof createBookingSchema>;
export type UpdateBookingDTO = z.infer<typeof updateBookingSchema>;