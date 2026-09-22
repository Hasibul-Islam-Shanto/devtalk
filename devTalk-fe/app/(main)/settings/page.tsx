'use client';

import { logoutFromServer } from '@/actions/auth.actions';
import { Button } from '@/components/ui/button';
import { APP_NAME } from '@/constants/brand';
import { useAuthStore } from '@/store/auth.store';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

const SettingsPage = () => {
  const router = useRouter();
  const { user, isLoggedIn, logout } = useAuthStore();

  const handleLogout = async () => {
    logout();
    router.push('/');
    await logoutFromServer();
  };

  return (
    <div className="mx-auto max-w-xl px-4 py-8 sm:px-6">
      <header className="mb-6">
        <h1 className="text-foreground text-2xl font-semibold tracking-tight">
          Settings
        </h1>
        <p className="text-muted-foreground mt-1 text-sm">
          Account and session for {APP_NAME}.
        </p>
      </header>

      {isLoggedIn && user ? (
        <section className="border-border bg-card space-y-4 rounded-lg border p-5">
          <div>
            <p className="text-foreground text-sm font-medium">{user.name}</p>
            <p className="text-muted-foreground font-mono text-sm">
              @{user.username}
            </p>
            <p className="text-muted-foreground mt-1 text-sm">{user.email}</p>
          </div>
          <div className="flex flex-wrap gap-2">
            <Button variant="secondary" asChild>
              <Link href={`/profile/${user.id ?? user._id}/edit`}>
                Edit profile
              </Link>
            </Button>
            <Button variant="destructive" onClick={handleLogout}>
              Log out
            </Button>
          </div>
        </section>
      ) : (
        <section className="border-border bg-card rounded-lg border p-5">
          <p className="text-muted-foreground text-sm">
            Sign in to manage your account.
          </p>
          <Button className="mt-4" asChild>
            <Link href="/signin">Sign in</Link>
          </Button>
        </section>
      )}
    </div>
  );
};

export default SettingsPage;
