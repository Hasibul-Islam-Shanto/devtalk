'use client';

import { updateApplicationStatus } from '@/actions/application.actions';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Application } from '@/types/application';
import { Check, X } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useTransition } from 'react';
import { toast } from 'sonner';

type Props = {
  applicationId: string;
  status: Application['status'];
  canManage: boolean;
};

export function ApplicationDecisionCard({
  applicationId,
  status,
  canManage,
}: Props) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  const handleSubmit = (next: 'accepted' | 'rejected') => {
    startTransition(async () => {
      const result = await updateApplicationStatus(applicationId, next);
      if (result.success) {
        toast.success(result.message);
        router.refresh();
      } else {
        toast.error(result.message);
      }
    });
  };

  if (!canManage) {
    return null;
  }

  if (status !== 'pending') {
    return (
      <Card className="bg-surface border-border p-6">
        <h2 className="text-foreground mb-2 text-lg font-semibold">Decision</h2>
        <p className="text-muted-foreground text-sm">
          This application is{' '}
          <span className="text-foreground font-medium capitalize">
            {status}
          </span>
          .
        </p>
      </Card>
    );
  }

  return (
    <Card className="bg-surface border-border flex w-full p-4">
      <p className="text-muted-foreground text-sm">
        Approve or reject this candidate for this role.
      </p>
      <div className="flex gap-3">
        <Button
          variant="destructive"
          disabled={isPending}
          onClick={() => handleSubmit('rejected')}
        >
          <X className="mr-2 h-4 w-4" />
          Reject
        </Button>
        <Button
          disabled={isPending}
          onClick={() => handleSubmit('accepted')}
        >
          <Check className="mr-2 h-4 w-4" />
          Approve
        </Button>
      </div>
    </Card>
  );
}
