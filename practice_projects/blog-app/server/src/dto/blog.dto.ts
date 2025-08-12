import { z } from 'zod';

// DTOs using Zod (strong runtime + TS type inference)

// Create Blog DTO
export const createBlogSchema = z.object({
  title: z.string().min(3, 'Title should be at least 3 characters'),
  content: z.string().min(3, 'Content should be at least 3 characters'),
  author: z.string().optional(),
  tags: z.array(z.string()).optional(),
});

export const updateBlogSchema = z.object({
  title: z.string().min(3).optional(),
  content: z.string().min(3).optional(),
  author: z.string().optional(),
  tags: z.array(z.string()).optional(),
});

// For params validation
export const paramsIdSchema = z.object({
  id: z.string().min(1),
});

export const paramsTitleSchema = z.object({
  title: z.string().min(1),
});

export type CreateBlogInput = z.infer<typeof createBlogSchema>;
export type UpdateBlogInput = z.infer<typeof updateBlogSchema>;
