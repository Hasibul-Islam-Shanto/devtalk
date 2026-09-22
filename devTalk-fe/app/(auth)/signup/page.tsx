import Link from 'next/link';
import SignupForm from './_components/signup-form';
import Image from 'next/image';
import { APP_NAME } from '@/constants/brand';

const SignupPage = () => {
  return (
    <div className="bg-background flex min-h-screen items-center justify-center p-4 py-8">
      <div className="w-full max-w-md">
        <div className="mb-8 flex flex-col items-center">
          <Link href="/" className="mb-4 flex items-center gap-2">
            <Image
              src="/devtalk-logo.svg"
              alt=""
              width={36}
              height={36}
              unoptimized
            />
            <span className="text-foreground text-sm font-semibold">
              {APP_NAME}
            </span>
          </Link>
          <h1 className="text-foreground text-2xl font-semibold">
            Create your account
          </h1>
          <p className="text-muted-foreground mt-1 text-sm">
            Join the {APP_NAME} community
          </p>
        </div>

        <div className="border-border bg-card rounded-lg border p-6">
          <SignupForm />
          <p className="text-muted-foreground mt-4 text-center text-xs">
            By signing up, you agree to our{' '}
            <Link href="/signup" className="text-primary hover:underline">
              Terms
            </Link>{' '}
            and{' '}
            <Link href="/signup" className="text-primary hover:underline">
              Privacy Policy
            </Link>
          </p>
        </div>

        <p className="text-muted-foreground mt-6 text-center">
          Already have an account?{' '}
          <Link
            href="/signin"
            className="text-primary font-medium hover:underline"
          >
            Sign in
          </Link>
        </p>
      </div>
    </div>
  );
};

export default SignupPage;
