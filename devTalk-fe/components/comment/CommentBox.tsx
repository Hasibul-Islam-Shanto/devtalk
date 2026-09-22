'use client';
import { useState, useRef, useEffect, useTransition } from 'react';
import { Button } from '../ui/button';
import dynamic from 'next/dynamic';
import { commands, ICommand } from '@uiw/react-md-editor';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Send } from 'lucide-react';
import { addComment } from '@/actions/comment.action';
import { logError } from '@/utils/apiError';
import { toast } from 'sonner';

const MDEditor = dynamic(() => import('@uiw/react-md-editor'), {
  ssr: false,
  loading: () => <div className="text-muted-foreground">Loading editor...</div>,
});

const MDEditorMarkdown = dynamic(
  () => import('@uiw/react-md-editor').then(mod => mod.default.Markdown),
  {
    ssr: false,
    loading: () => (
      <div className="text-muted-foreground">Loading preview...</div>
    ),
  },
);

const customCommands: ICommand[] = [
  commands.bold,
  commands.italic,
  commands.link,
  commands.code,
  commands.codeBlock,
  commands.checkedListCommand,
];

const commentSchema = z.object({
  comment: z.string().min(1, 'Comment cannot be empty'),
});
type CommentFormData = z.infer<typeof commentSchema>;

const CommentBox = ({
  id,
  commentableType,
}: {
  id: string;
  commentableType: 'QUESTION' | 'BLOG' | 'JOB';
}) => {
  const [expanded, setExpanded] = useState(false);
  const [activeTab, setActiveTab] = useState<'write' | 'preview'>('write');
  const inputRef = useRef<HTMLInputElement>(null);
  const [isPending, startTransition] = useTransition();
  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
    getValues,
  } = useForm<CommentFormData>({
    resolver: zodResolver(commentSchema),
    defaultValues: { comment: '' },
    mode: 'onBlur',
  });

  const commentValue = getValues('comment');

  useEffect(() => {
    if (expanded && inputRef.current) {
      inputRef.current.focus();
    }
  }, [expanded]);

  const onSubmit = async (data: CommentFormData) => {
    startTransition(async () => {
      try {
        const response = await addComment({
          commentableType: commentableType,
          commentableId: id,
          comment: data.comment,
        });
        if (response.success) {
          toast.success(response.message || 'Comment added successfully', {
            duration: 2000,
            position: 'top-center',
          });
        } else {
          throw new Error(response.message);
        }
      } catch (error) {
        logError(error, 'CommentBox');
        toast.error('Unable to add comment.', {
          duration: 2000,
          position: 'top-center',
          description:
            error instanceof Error
              ? error.message
              : 'There was an error commenting the question.',
        });
      } finally {
        reset();
        setExpanded(false);
        setActiveTab('write');
      }
    });
  };

  return (
    <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
      {!expanded ? (
        <div
          className="border-input bg-background text-muted-foreground hover:border-primary cursor-text rounded-md border px-3 py-2 transition-all duration-200"
          onClick={() => setExpanded(true)}
        >
          Write your comment...
        </div>
      ) : (
        <div className="border-border overflow-hidden rounded-lg border">
          <div className="border-border bg-muted/30 flex border-b">
            <button
              type="button"
              onClick={() => setActiveTab('write')}
              className={`px-4 py-2 text-sm font-medium transition-colors ${
                activeTab === 'write'
                  ? 'text-foreground border-primary bg-background border-b-2'
                  : 'text-muted-foreground hover:text-foreground'
              }`}
            >
              Write
            </button>
            <button
              type="button"
              onClick={() => setActiveTab('preview')}
              className={`px-4 py-2 text-sm font-medium transition-colors ${
                activeTab === 'preview'
                  ? 'text-foreground border-primary bg-background border-b-2'
                  : 'text-muted-foreground hover:text-foreground'
              }`}
            >
              Preview
            </button>
          </div>

          <div className="bg-background min-h-50 p-4">
            {activeTab === 'write' ? (
              <Controller
                name="comment"
                control={control}
                render={({ field }) => (
                  <MDEditor
                    value={field.value}
                    onChange={field.onChange}
                    preview="edit"
                    hideToolbar={false}
                    commands={customCommands}
                    extraCommands={[]}
                    height={180}
                    visibleDragbar={false}
                    textareaProps={{
                      placeholder: 'Write your comment....',
                    }}
                    className="custom-md-editor"
                  />
                )}
              />
            ) : (
              <div className="prose prose-invert min-h-45 max-w-none">
                {commentValue ? (
                  <MDEditorMarkdown
                    source={commentValue}
                    style={{
                      whiteSpace: 'pre-wrap',
                      background: 'transparent',
                    }}
                  />
                ) : (
                  <p className="text-muted-foreground italic">
                    Nothing to preview. Write something first.
                  </p>
                )}
              </div>
            )}
          </div>

          {errors.comment && (
            <div className="px-4 pb-2">
              <p className="text-sm text-red-500">{errors.comment.message}</p>
            </div>
          )}

          <div className="border-border bg-muted/30 flex justify-end gap-2 border-t p-4">
            <Button
              type="button"
              variant="ghost"
              onClick={() => {
                setExpanded(false);
                setActiveTab('write');
                reset();
              }}
            >
              Cancel
            </Button>
            <Button type="submit" loading={isPending}>
              <Send className="mr-2 h-4 w-4" />
              Post comment
            </Button>
          </div>
        </div>
      )}
    </form>
  );
};

export default CommentBox;
