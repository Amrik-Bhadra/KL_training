import { z } from "zod";

export const createEventSchema = z.object({
    title: z.string().min(5, 'Event name should have atleast 5 characters'),
    description: z.string().min(10, 'Event description'),
    date: z.coerce.date(),
    location: z.string().min(3, 'Location should have at least 3 characters'),
    price: z.number().positive('Price must be greater than 0'),
});

export const updateEventSchema = z.object({
  title: z.string().min(5, 'Event name should have at least 5 characters').optional(),
  description: z.string().min(10, 'Event description should have at least 10 characters').optional(),
  date: z.coerce.date().optional(),
  location: z.string().min(3, 'Location should have at least 3 characters').optional(),
  price: z.number().positive('Price must be greater than 0').optional(),
});

export type CreateEventDTO = z.infer<typeof createEventSchema>;
export type UpdateEventDTO = z.infer<typeof updateEventSchema>;