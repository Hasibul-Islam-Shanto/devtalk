'use client';

import { Button } from '@/components/ui/button';

type Props = {
  isSaving: boolean;
  onCancel: () => void;
};

export function EditProfileFormFooter({ isSaving, onCancel }: Props) {
  return (
    <div className="border-border flex flex-wrap items-center justify-end gap-3 border-t pt-6">
      <Button
        type="button"
        variant="outline"
        className="rounded-lg"
        onClick={onCancel}
      >
        Cancel
      </Button>
      <Button type="submit" loading={isSaving}>
        Save changes
      </Button>
    </div>
  );
}
