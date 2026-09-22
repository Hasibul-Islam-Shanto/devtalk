import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import { APP_NAME } from '@/constants/brand';

export function EditProfilePageHeader() {
  return (
    <>
      <nav aria-label="Breadcrumb">
        <Link
          href="/profile"
          className="text-muted-foreground hover:text-foreground inline-flex items-center gap-2 text-sm font-medium transition-colors duration-200"
        >
          <ArrowLeft className="h-4 w-4 shrink-0" aria-hidden />
          Back to profile
        </Link>
      </nav>

      <header>
        <h1 className="text-foreground text-2xl font-semibold tracking-tight">
          Edit profile
        </h1>
        <p className="text-muted-foreground mt-1 max-w-lg text-sm leading-relaxed">
          Update how you appear across {APP_NAME} — photo, bio, skills, and
          links.
        </p>
      </header>
    </>
  );
}
