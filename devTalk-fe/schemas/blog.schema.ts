import { z } from 'zod';

export const blogSchema = z.object({
  title: z
    .string()
    .min(5, 'Title must be at least 5 characters long')
    .max(100, 'Title must be at most 100 characters long'),
  description: z
    .string()
    .min(20, 'Description must be at least 20 characters long'),
  tags: z.array(z.string()).max(5, 'You can select up to 5 tags only'),
  cover: z.string().url('Must be a valid URL').optional().or(z.literal('')),
});

export type BlogFormData = z.infer<typeof blogSchema>;
