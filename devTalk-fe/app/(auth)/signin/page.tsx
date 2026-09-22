import SigninForm from './_components/signin-form';
import Link from 'next/link';
import Image from 'next/image';
import { APP_NAME } from '@/constants/brand';

const SigninPage = () => {
  return (
    <div className="bg-background flex min-h-screen items-center justify-center p-4">
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
            Welcome back
          </h1>
          <p className="text-muted-foreground mt-1 text-sm">
            Sign in to your {APP_NAME} account
          </p>
        </div>

        <div className="border-border bg-card rounded-lg border p-6">
          <SigninForm />
        </div>

        <p className="text-muted-foreground mt-6 text-center">
          Don&apos;t have an account?{' '}
          <Link
            href="/signup"
            className="text-primary font-medium hover:underline"
          >
            Sign up
          </Link>
        </p>
      </div>
    </div>
  );
};

export default SigninPage;
