'use client';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Button } from '../ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';
import { ChevronDown, LogOut, Settings, User } from 'lucide-react';
import Link from 'next/link';
import { useAuthStore } from '@/store/auth.store';
import { logoutFromServer } from '@/actions/auth.actions';
import { useRouter } from 'next/navigation';

const NavbarUserButton = () => {
  const router = useRouter();
  const { logout, isLoggedIn, user } = useAuthStore();
  const handleLogout = async () => {
    logout();
    router.push('/');
    await logoutFromServer();
  };
  return (
    <div className="flex items-center gap-2">
      {isLoggedIn ? (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="gap-2 pr-1 pl-2">
              <Avatar>
                <AvatarImage
                  src={user?.profileImage}
                  alt={user?.username || 'User'}
                />
                <AvatarFallback className="font-bold">
                  {user?.username?.substring(0, 2).toUpperCase()}
                </AvatarFallback>
              </Avatar>

              <ChevronDown className="text-muted-foreground h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            align="end"
            className="bg-surface border-border w-56"
          >
            <div className="border-border border-b p-3">
              <p className="text-foreground font-medium">{user?.username}</p>
              <p className="text-muted-foreground text-sm">{user?.email}</p>
            </div>
            <DropdownMenuItem asChild>
              <Link href="/profile" className="cursor-pointer">
                <User className="mr-2 h-4 w-4" />
                Profile
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem asChild>
              <Link href="/settings" className="cursor-pointer">
                <Settings className="mr-2 h-4 w-4" />
                Settings
              </Link>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              className="text-destructive cursor-pointer"
              onClick={handleLogout}
            >
              <LogOut className="mr-2 h-4 w-4" />
              Sign out
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      ) : (
        <Button type="button" variant="default" asChild>
          <Link href="/signin">Sign in</Link>
        </Button>
      )}
    </div>
  );
};

export default NavbarUserButton;
