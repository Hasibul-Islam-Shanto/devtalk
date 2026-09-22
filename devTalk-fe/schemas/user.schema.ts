import { z } from 'zod';

export const UserSchema = z.object({
  username: z.string().min(3, 'Username must be at least 3 characters long'),
  name: z.string().min(5, 'Name must be at least 5 characters long'),
  email: z.email('Invalid email address'),
  bio: z.string().optional(),
  profileImage: z.string().url('Profile image must be a valid URL').optional(),
  location: z.string().optional(),
  website: z.string().optional(),
  socialLinks: z.object({
    twitter: z.string().optional(),
    linkedin: z.string().optional(),
    github: z.string().optional(),
  }),
  skills: z.array(z.string()).optional(),
});

export type UserFormData = z.infer<typeof UserSchema>;
