import type { LucideIcon } from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';

interface EmptyStateProps {
  icon: LucideIcon;
  title: string;
  description: string;
  actionLabel?: string;
  actionHref?: string;
}

export function EmptyState({
  icon: Icon,
  title,
  description,
  actionLabel,
  actionHref,
}: EmptyStateProps) {
  return (
    <div className="border-border/80 bg-card flex flex-col items-center justify-center rounded-2xl border px-8 py-16 text-center shadow-[0_16px_40px_-24px_rgba(0,0,0,0.45)] sm:px-12 sm:py-20">
      <span className="bg-primary/10 text-primary mb-6 flex h-12 w-12 items-center justify-center rounded-2xl">
        <Icon className="h-5 w-5" aria-hidden />
      </span>
      <h3 className="text-foreground text-lg font-medium">{title}</h3>
      <p className="text-muted-foreground mt-2 max-w-md text-sm leading-relaxed">
        {description}
      </p>
      {actionLabel && actionHref ? (
        <Button className="mt-8 rounded-full px-5" asChild>
          <Link href={actionHref}>{actionLabel}</Link>
        </Button>
      ) : null}
    </div>
  );
}
