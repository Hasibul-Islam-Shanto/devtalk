'use client';

import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';

export function RetryButton({ label = 'Try again' }: { label?: string }) {
  const router = useRouter();

  return (
    <Button variant="secondary" size="sm" onClick={() => router.refresh()}>
      {label}
    </Button>
  );
}
