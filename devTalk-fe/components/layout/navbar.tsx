import { APP_NAME } from '@/constants/brand';
import { Search } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import MobileNavigationButton from '../buttons/mobile-navigation-button';
import NavbarUserButton from '../buttons/navbar-user-button';
import CreateMenu from '../navbar/create-menu';
import NotificationButton from '../navbar/notification-button';
import PrimaryNav from '../navbar/primary-nav';
import { ThemeToggle } from '../theme-toggle';

const Navbar = () => {
  return (
    <header className="sticky top-0 z-50 px-4 pt-4 sm:px-6 lg:px-8">
      <nav
        className="border-border/70 bg-card/80 shadow-[0_16px_40px_-20px_rgba(0,0,0,0.55),0_0_0_1px_rgba(16,185,129,0.08)] supports-backdrop-filter:bg-card/65 animate-in fade-in slide-in-from-top-3 mx-auto flex h-[4.25rem] max-w-6xl items-center gap-2 rounded-2xl border px-2.5 backdrop-blur-xl duration-500 sm:px-3.5 lg:gap-4 lg:px-5"
        aria-label="Main"
      >
        <div className="flex shrink-0 items-center gap-2">
          <MobileNavigationButton />
          <Link
            href="/"
            className="focus-visible:ring-ring group flex items-center gap-2.5 rounded-full px-1.5 py-1 outline-none focus-visible:ring-2"
          >
            <Image
              src="/devtalk-logo.svg"
              alt=""
              width={28}
              height={28}
              unoptimized
              className="h-7 w-7 transition-transform duration-300 ease-out group-hover:scale-110"
            />
            <span className="text-foreground text-sm font-semibold tracking-tight">
              {APP_NAME}
            </span>
          </Link>
        </div>

        <PrimaryNav />

        <div className="hidden min-w-0 flex-1 justify-center px-2 lg:flex">
          <label className="group relative block w-full max-w-md">
            <span className="sr-only">Search</span>
            <Search
              className="text-muted-foreground group-focus-within:text-primary pointer-events-none absolute top-1/2 left-3.5 h-4 w-4 -translate-y-1/2 transition-colors duration-200"
              aria-hidden
            />
            <input
              type="search"
              placeholder="Search questions, blogs, jobs"
              className="border-input/80 bg-background/70 text-foreground placeholder:text-muted-foreground focus-visible:border-primary/50 focus-visible:ring-primary/25 h-10 w-full rounded-full border pr-4 pl-10 text-sm transition-[border-color,box-shadow,background-color] duration-200 outline-none focus-visible:ring-[3px]"
            />
          </label>
        </div>

        <div className="ml-auto flex shrink-0 items-center gap-1.5">
          <CreateMenu />
          <ThemeToggle />
          <NotificationButton />
          <NavbarUserButton />
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
