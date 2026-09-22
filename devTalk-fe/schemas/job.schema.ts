import { z } from 'zod';

export const jobSchema = z
  .object({
    title: z
      .string()
      .min(5, 'Title must be at least 5 characters long')
      .max(100, 'Title must be at most 100 characters long'),
    description: z
      .string()
      .min(50, 'Description must be at least 50 characters long'),
    company: z
      .string()
      .min(2, 'Company name is required')
      .max(100, 'Company name is too long'),
    location: z.enum(['Remote', 'On-site', 'Hybrid']),
    employmentType: z.enum([
      'Full-time',
      'Part-time',
      'Contract',
      'Internship',
    ]),
    minSalary: z.number().min(0, 'Minimum salary cannot be negative'),
    maxSalary: z.number(),
    requiredSkills: z
      .array(z.string())
      .min(1, 'At least one skill is required')
      .max(10, 'Maximum 10 skills allowed'),
    expiresAt: z.string().refine(date => {
      const selectedDate = new Date(date);
      const now = new Date();
      return selectedDate > now;
    }, 'Expiration date must be in the future'),
  })
  .refine(data => data.maxSalary >= data.minSalary, {
    message: 'Maximum salary must be greater than or equal to minimum salary',
    path: ['maxSalary'],
  });

export type JobFormData = z.infer<typeof jobSchema>;
