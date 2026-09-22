'use client';

import { signup } from '@/actions/auth.actions';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { signupSchema, SignupSchemaType } from '@/schemas/auth.schema';
import { zodResolver } from '@hookform/resolvers/zod';
import { Eye, EyeOff } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useState, useTransition } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';

const SignupForm = () => {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignupSchemaType>({
    resolver: zodResolver(signupSchema),
    mode: 'onBlur',
  });
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [isPending, startTransition] = useTransition();

  const onSubmit = (data: SignupSchemaType) => {
    startTransition(async () => {
      try {
        const response = await signup(
          data.name,
          data.username,
          data.email,
          data.password,
        );
        if (response.success) {
          toast.success('Signed up successfully', {
            duration: 1000,
            position: 'top-center',
            description: 'You have successfully created your account.',
          });
          router.push('/signin');
        } else {
          toast.error('Sign up failed!', {
            duration: 2000,
            position: 'top-center',
            description:
              response.message ||
              'There was an error signing up. Please try again.',
          });
        }
      } catch (error) {
        toast.error('Sign up failed!', {
          duration: 3000,
          position: 'top-center',
          description:
            error instanceof Error
              ? error.message
              : 'There was an error signing up. Please try again.',
        });
      }
    });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="name">Name</Label>
        <Input
          {...register('name')}
          id="name"
          type="text"
          placeholder="Hi Dev"
        />
        {errors.name && (
          <p className="text-destructive mt-1 text-xs">{errors.name.message}</p>
        )}
      </div>
      <div className="space-y-2">
        <Label htmlFor="username">Username</Label>
        <Input
          {...register('username')}
          id="username"
          type="text"
          placeholder="hidev"
        />
        {errors.username && (
          <p className="text-destructive mt-1 text-xs">
            {errors.username.message}
          </p>
        )}
      </div>

      <div className="space-y-2">
        <Label htmlFor="email">Email</Label>
        <Input
          {...register('email')}
          id="email"
          type="email"
          placeholder="hidev@example.com"
        />
        {errors.email && (
          <p className="text-destructive mt-1 text-xs">
            {errors.email.message}
          </p>
        )}
      </div>

      <div className="space-y-2">
        <Label htmlFor="password">Password</Label>
        <div className="relative">
          <Input
            {...register('password')}
            id="password"
            type={showPassword ? 'text' : 'password'}
            placeholder="••••••••"
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="text-muted-foreground hover:text-foreground absolute top-1/2 right-3 -translate-y-1/2 transition-colors"
          >
            {showPassword ? (
              <EyeOff className="h-4 w-4" />
            ) : (
              <Eye className="h-4 w-4" />
            )}
          </button>
        </div>
        {errors.password && (
          <p className="text-destructive mt-1 text-xs">
            {errors.password.message}
          </p>
        )}
      </div>

      <div className="space-y-2">
        <Label htmlFor="confirmPassword">Confirm Password</Label>
        <Input
          {...register('confirmPassword')}
          id="confirmPassword"
          type="password"
          placeholder="••••••••"
        />
        {errors.confirmPassword && (
          <p className="text-destructive mt-1 text-xs">
            {errors.confirmPassword.message}
          </p>
        )}
      </div>

      <Button type="submit" className="w-full" loading={isPending}>
        Create account
      </Button>
    </form>
  );
};

export default SignupForm;
