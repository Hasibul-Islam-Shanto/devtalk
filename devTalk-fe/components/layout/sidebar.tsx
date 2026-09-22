import Link from 'next/link';
import { Button } from '@/components/ui/button';
import SidebarContainer from '../navbar/sidebar-container';
import SidebarNav from '../navbar/sidebar-nav';
import { Briefcase, MessageSquare, PenLine } from 'lucide-react';
import { ACCOUNT_NAV_ITEMS, PRIMARY_NAV_ITEMS } from '@/constants/navItems';

const Sidebar = () => {
  return (
    <SidebarContainer>
      <div className="flex h-full flex-col gap-6">
        <div className="flex flex-col gap-2">
          <Button className="w-full justify-start" asChild>
            <Link href="/questions/create">
              <MessageSquare className="h-4 w-4" aria-hidden />
              Ask a question
            </Link>
          </Button>
          <Button variant="secondary" className="w-full justify-start" asChild>
            <Link href="/blogs/create">
              <PenLine className="h-4 w-4" aria-hidden />
              Write a blog
            </Link>
          </Button>
          <Button variant="secondary" className="w-full justify-start" asChild>
            <Link href="/jobs/create">
              <Briefcase className="h-4 w-4" aria-hidden />
              Post a job
            </Link>
          </Button>
        </div>

        <div>
          <p className="text-muted-foreground mb-2 px-3 text-[11px] font-medium tracking-wide uppercase">
            Explore
          </p>
          <SidebarNav items={PRIMARY_NAV_ITEMS} />
        </div>

        <div className="bg-border h-px shrink-0" role="separator" />

        <div>
          <p className="text-muted-foreground mb-2 px-3 text-[11px] font-medium tracking-wide uppercase">
            Account
          </p>
          <SidebarNav items={ACCOUNT_NAV_ITEMS} />
        </div>
      </div>
    </SidebarContainer>
  );
};

export default Sidebar;
