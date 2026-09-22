'use client';

import { AlertTriangle } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface ErrorStateProps {
  title?: string;
  message: string;
  onRetry?: () => void;
}

export function ErrorState({
  title = 'Something went wrong',
  message,
  onRetry,
}: ErrorStateProps) {
  return (
    <div className="border-border bg-card flex flex-col items-center justify-center rounded-lg border px-6 py-14 text-center">
      <span className="bg-destructive/10 text-destructive mb-4 flex h-10 w-10 items-center justify-center rounded-md">
        <AlertTriangle className="h-5 w-5" aria-hidden />
      </span>
      <h3 className="text-foreground text-base font-medium">{title}</h3>
      <p className="text-muted-foreground mt-1 max-w-sm text-sm">{message}</p>
      {onRetry ? (
        <Button variant="secondary" className="mt-4" onClick={onRetry}>
          Try again
        </Button>
      ) : null}
    </div>
  );
}
