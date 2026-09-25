'use client';

import { PRIMARY_NAV_ITEMS } from '@/constants/navItems';
import { cn } from '@/lib/utils';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useCallback, useLayoutEffect, useRef, useState } from 'react';

const PrimaryNav = () => {
  const pathname = usePathname();
  const navRef = useRef<HTMLElement>(null);
  const [hovered, setHovered] = useState<string | null>(null);
  const [indicator, setIndicator] = useState({
    left: 0,
    width: 0,
    visible: false,
  });

  const isActive = (href: string) => {
    if (href === '/') return pathname === '/';
    return pathname === href || pathname.startsWith(`${href}/`);
  };

  const activeHref =
    PRIMARY_NAV_ITEMS.find(item => isActive(item.href))?.href ?? null;
  const targetHref = hovered ?? activeHref;

  const moveIndicator = useCallback((href: string | null) => {
    const nav = navRef.current;
    if (!nav || !href) {
      setIndicator(current => ({ ...current, visible: false }));
      return;
    }

    const link = nav.querySelector<HTMLElement>(`[data-nav="${href}"]`);
    if (!link) return;

    setIndicator({
      left: link.offsetLeft,
      width: link.offsetWidth,
      visible: true,
    });
  }, []);

  useLayoutEffect(() => {
    // Measure after the effect so the indicator update is not a synchronous setState.
    // A microtask still runs before the browser paints.
    queueMicrotask(() => moveIndicator(targetHref));
  }, [moveIndicator, targetHref]);

  useLayoutEffect(() => {
    const nav = navRef.current;
    if (!nav) return;

    const observer = new ResizeObserver(() => moveIndicator(targetHref));
    observer.observe(nav);
    return () => observer.disconnect();
  }, [moveIndicator, targetHref]);

  return (
    <nav
      ref={navRef}
      className="relative hidden items-center gap-0.5 md:flex"
      aria-label="Primary"
      onMouseLeave={() => setHovered(null)}
    >
      <span
        aria-hidden
        className={cn(
          'bg-primary/15 pointer-events-none absolute top-1/2 h-9 -translate-y-1/2 rounded-full transition-[left,width,opacity] duration-300 ease-[cubic-bezier(0.22,1,0.36,1)]',
          indicator.visible ? 'opacity-100' : 'opacity-0',
        )}
        style={{ left: indicator.left, width: indicator.width }}
      />
      {PRIMARY_NAV_ITEMS.map(item => {
        const active = isActive(item.href);
        const highlighted = active || hovered === item.href;

        return (
          <Link
            key={item.href}
            href={item.href}
            data-nav={item.href}
            onMouseEnter={() => setHovered(item.href)}
            className={cn(
              'focus-visible:ring-ring/40 relative z-10 rounded-full px-2.5 py-2 text-sm transition-colors duration-200 outline-none focus-visible:ring-[3px] lg:px-3.5',
              highlighted
                ? 'text-primary font-medium'
                : 'text-muted-foreground hover:text-foreground',
            )}
          >
            {item.label}
          </Link>
        );
      })}
    </nav>
  );
};

export default PrimaryNav;
