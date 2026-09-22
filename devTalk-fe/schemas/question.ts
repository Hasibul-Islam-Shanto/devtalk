import { z } from 'zod';

export const QuestionSchema = z.object({
  title: z
    .string()
    .min(15, 'Title must be at least 15 characters long')
    .max(150, 'Title must be at most 150 characters long'),
  description: z
    .string()
    .min(30, 'Description must be at least 30 characters long'),
  tags: z
    .array(z.string())
    .min(1, 'At least one tag is required')
    .max(5, 'You can add up to 5 tags'),
});

export type QuestionFormData = z.infer<typeof QuestionSchema>;
