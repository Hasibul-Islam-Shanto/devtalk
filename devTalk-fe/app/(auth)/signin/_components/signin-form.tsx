'use client';
import { login } from '@/actions/auth.actions';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { signinSchema, SigninSchemaType } from '@/schemas/auth.schema';
import { useAuthStore } from '@/store/auth.store';
import { zodResolver } from '@hookform/resolvers/zod';
import { Eye, EyeOff } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState, useTransition } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';

const SigninForm = () => {
  const router = useRouter();
  const { setUser } = useAuthStore();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SigninSchemaType>({
    resolver: zodResolver(signinSchema),
    mode: 'onBlur',
  });
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [isPending, startTransition] = useTransition();
  const onSubmit = (data: SigninSchemaType) => {
    startTransition(async () => {
      try {
        const response = await login(data.email, data.password);

        if (response.success) {
          setUser(response?.user);
          toast.success('Signed in successfully', {
            duration: 1000,
            position: 'top-center',
            description: 'You have successfully signed in to your account.',
          });
          router.push('/');
        } else {
          toast.error('Sign in failed!', {
            duration: 2000,
            position: 'top-center',
            description:
              response.message ||
              'There was an error signing in. Please try again.',
          });
        }
      } catch (error) {
        toast.error('Sign in failed!', {
          duration: 3000,
          position: 'top-center',
          description:
            error instanceof Error
              ? error.message
              : 'There was an error signing in. Please try again.',
        });
      }
    });
  };
  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
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
        <div className="flex items-center justify-between">
          <Label htmlFor="password">Password</Label>
          <Link
            href="/forgot-password"
            className="text-primary text-sm hover:underline"
          >
            Forgot password?
          </Link>
        </div>
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

      <Button type="submit" className="w-full" loading={isPending}>
        Sign in
      </Button>
    </form>
  );
};

export default SigninForm;
