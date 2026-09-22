'use client';

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import { useShellStore } from '@/store/shell.store';

interface SidebarContainerProps {
  children: React.ReactNode;
}

const SidebarContainer = ({ children }: SidebarContainerProps) => {
  const pathname = usePathname();
  const { mobileSidebarOpen, setMobileSidebarOpen } = useShellStore();

  useEffect(() => {
    setMobileSidebarOpen(false);
  }, [pathname, setMobileSidebarOpen]);

  return (
    <>
      {mobileSidebarOpen && (
        <button
          type="button"
          aria-label="Close menu"
          className="bg-background/75 fixed inset-0 z-40 backdrop-blur-sm transition-opacity duration-200 md:hidden"
          onClick={() => setMobileSidebarOpen(false)}
        />
      )}
      <aside
        className={cn(
          'border-sidebar-border bg-sidebar fixed top-14 left-0 z-50 flex h-[calc(100vh-3.5rem)] w-72 flex-col border-r p-4 transition-transform duration-200 ease-out md:hidden',
          mobileSidebarOpen ? 'translate-x-0' : '-translate-x-full',
        )}
      >
        {children}
      </aside>
    </>
  );
};

export default SidebarContainer;
