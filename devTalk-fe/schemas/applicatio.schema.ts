import { z } from 'zod';

export const applicationSchema = z
  .object({
    email: z.string().email('Invalid email address'),
    resumeUrl: z.string().url('Invalid resume URL'),
    coverLetter: z.string().min(1, 'Cover letter is required'),
  })
  .refine(data => data.email && data.resumeUrl && data.coverLetter, {
    message: 'All fields are required',
    path: ['email', 'resumeUrl', 'coverLetter'],
  });

export type ApplicationSchema = z.infer<typeof applicationSchema>;
