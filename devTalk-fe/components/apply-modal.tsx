'use client';

import { useTransition } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { toast } from 'sonner';
import { useForm } from 'react-hook-form';
import {
  applicationSchema,
  ApplicationSchema,
} from '@/schemas/applicatio.schema';
import { zodResolver } from '@hookform/resolvers/zod';
import { applyToJob } from '@/actions/application.actions';
import { useRouter } from 'next/navigation';

interface ApplyModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  jobTitle: string;
  jobId: string;
}

const ApplyModal = ({
  open,
  onOpenChange,
  jobTitle,
  jobId,
}: ApplyModalProps) => {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ApplicationSchema>({
    resolver: zodResolver(applicationSchema),
    mode: 'all',
  });
  const [isApplying, startApplying] = useTransition();

  const onSubmit = (data: ApplicationSchema) => {
    try {
      startApplying(async () => {
        const response = await applyToJob({
          jobId,
          ...data,
        });
        if (response.success) {
          toast.success(response.message, {
            duration: 2000,
            position: 'top-center',
          });
          reset();
          onOpenChange(false);
          router.push(`/jobs`);
        } else {
          toast.error(response.message || 'Failed to apply to job', {
            duration: 2000,
            position: 'top-center',
          });
        }
      });
    } catch (error) {
      toast.error(
        error instanceof Error ? error.message : 'Failed to apply to job',
      );
      console.error(error);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="bg-surface border-border">
        <DialogHeader>
          <DialogTitle>Apply for {jobTitle}</DialogTitle>
        </DialogHeader>
        <div className="space-y-4 py-4">
          <div className="space-y-2">
            <Label>Email *</Label>
            <Input
              {...register('email')}
              type="email"
              placeholder="john@example.com"
              className="bg-muted border-border"
            />
            {errors.email && (
              <p className="text-destructive mt-1 text-xs">
                {errors.email.message}
              </p>
            )}
          </div>
          <div className="space-y-2">
            <Label>Resume URL</Label>
            <Input
              {...register('resumeUrl')}
              placeholder="https://..."
              className="bg-muted border-border"
            />
            {errors.resumeUrl && (
              <p className="text-destructive mt-1 text-xs">
                {errors.resumeUrl.message}
              </p>
            )}
          </div>
          <div className="space-y-2">
            <Label>Cover Letter</Label>
            <Textarea
              {...register('coverLetter')}
              placeholder="Why are you interested in this position?"
              className="bg-muted border-border min-h-[100px]"
            />
            {errors.coverLetter && (
              <p className="text-destructive mt-1 text-xs">
                {errors.coverLetter.message}
              </p>
            )}
          </div>
          <Button
            className="w-full"
            onClick={handleSubmit(onSubmit)}
            loading={isApplying}
          >
            Submit application
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ApplyModal;
