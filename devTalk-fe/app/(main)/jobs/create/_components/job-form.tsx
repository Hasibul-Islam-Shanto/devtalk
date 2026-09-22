'use client';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Send, X } from 'lucide-react';
import { useState, useTransition } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { JobFormData, jobSchema } from '@/schemas/job.schema';
import dynamic from 'next/dynamic';
import { commands, ICommand } from '@uiw/react-md-editor';
import { zodResolver } from '@hookform/resolvers/zod';
import { postJob } from '@/actions/job.actions';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';

const MDEditor = dynamic(() => import('@uiw/react-md-editor'), {
  ssr: false,
  loading: () => (
    <div className="bg-muted flex h-44 items-center justify-center rounded-md border">
      <p className="text-muted-foreground">Loading editor...</p>
    </div>
  ),
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

const JobForm = () => {
  const router = useRouter();
  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
    setValue,
    getValues,
    reset,
  } = useForm<JobFormData>({
    resolver: zodResolver(jobSchema),
  });

  const [tagInput, setTagInput] = useState('');
  const [activeTab, setActiveTab] = useState<'write' | 'preview'>('write');
  const [isPending, startTransition] = useTransition();

  const selectedSkills = getValues('requiredSkills') || [];
  const descriptionValue = getValues('description') || '';

  const handleAddSkill = (skill: string) => {
    if (
      skill &&
      !selectedSkills.includes(skill) &&
      selectedSkills.length < 10
    ) {
      setTagInput('');
      setValue('requiredSkills', [...selectedSkills, skill]);
    }
  };

  const handleRemoveSkill = (skill: string) => {
    setValue(
      'requiredSkills',
      selectedSkills.filter(s => s !== skill),
    );
  };

  const onSubmit = async (data: JobFormData) => {
    try {
      startTransition(async () => {
        const response = await postJob({
          title: data.title,
          description: data.description,
          company: data.company,
          location: data.location,
          salaryRange: `$${data.minSalary} - $${data.maxSalary}`,
          employmentType: data.employmentType,
          requiredSkills: data.requiredSkills,
          expiresAt: data.expiresAt ? new Date(data.expiresAt) : undefined,
        });
        if (response.success) {
          toast.success('Job posted successfully!', {
            duration: 2000,
            position: 'top-center',
          });
          reset();
          router.push('/jobs');
        } else {
          toast.error(
            response.message || 'Failed to post the job. Please try again.',
            {
              duration: 4000,
              position: 'top-center',
            },
          );
        }
      });
    } catch (error) {
      toast.error('Unable to post the job!', {
        duration: 4000,
        position: 'top-center',
        description:
          error instanceof Error ? error.message : 'Please try again later.',
      });
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="border-border bg-card w-full space-y-6 rounded-lg border p-6"
    >
      <div className="flex items-center justify-between">
        <h2 className="text-foreground text-lg font-semibold">Job Details</h2>
      </div>

      <div className="space-y-2">
        <Label htmlFor="title">Job Title *</Label>
        <Input
          {...register('title')}
          id="title"
          placeholder="e.g. Senior Frontend Developer"
          className="text-lg"
        />
        <p className="text-muted-foreground text-xs">
          Be clear and specific about the role
        </p>
        {errors.title && (
          <p className="text-sm text-red-500">{errors.title.message}</p>
        )}
      </div>

      <div className="space-y-2">
        <Label htmlFor="company">Company Name *</Label>
        <Input
          {...register('company')}
          id="company"
          placeholder="Your company name"
        />
        {errors.company && (
          <p className="text-sm text-red-500">{errors.company.message}</p>
        )}
      </div>

      <div className="grid w-full gap-4 sm:grid-cols-2">
        <div className="w-full space-y-2">
          <Label htmlFor="location">Location Type *</Label>
          <Controller
            name="location"
            control={control}
            render={({ field }) => (
              <Select value={field.value} onValueChange={field.onChange}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select location type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Remote">Remote</SelectItem>
                  <SelectItem value="On-site">On-site</SelectItem>
                  <SelectItem value="Hybrid">Hybrid</SelectItem>
                </SelectContent>
              </Select>
            )}
          />
          {errors.location && (
            <p className="text-sm text-red-500">{errors.location.message}</p>
          )}
        </div>

        <div className="w-full space-y-2">
          <Label htmlFor="employmentType">Employment Type *</Label>
          <Controller
            name="employmentType"
            control={control}
            render={({ field }) => (
              <Select value={field.value} onValueChange={field.onChange}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select employment type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Full-time">Full-time</SelectItem>
                  <SelectItem value="Part-time">Part-time</SelectItem>
                  <SelectItem value="Contract">Contract</SelectItem>
                  <SelectItem value="Internship">Internship</SelectItem>
                </SelectContent>
              </Select>
            )}
          />
          {errors.employmentType && (
            <p className="text-sm text-red-500">
              {errors.employmentType.message}
            </p>
          )}
        </div>
      </div>

      <div className="space-y-2">
        <Label>Salary Range (USD/year) *</Label>
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Input
              {...register('minSalary', { valueAsNumber: true })}
              type="number"
              placeholder="Min (e.g. 80000)"
            />
            {errors.minSalary && (
              <p className="text-sm text-red-500">{errors.minSalary.message}</p>
            )}
          </div>
          <div className="space-y-2">
            <Input
              {...register('maxSalary', { valueAsNumber: true })}
              type="number"
              placeholder="Max (e.g. 120000)"
            />
            {errors.maxSalary && (
              <p className="text-sm text-red-500">{errors.maxSalary.message}</p>
            )}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="expiresAt">Application Deadline (optional)</Label>
          <Input
            {...register('expiresAt')}
            id="expiresAt"
            type="date"
            min={new Date().toISOString().split('T')[0]}
          />
          {errors.expiresAt && (
            <p className="text-sm text-red-500">{errors.expiresAt.message}</p>
          )}
        </div>
      </div>

      <div className="space-y-2">
        <Label>Job Description *</Label>
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

          <div className="bg-background p-4">
            {activeTab === 'write' ? (
              <Controller
                name="description"
                control={control}
                render={({ field }) => (
                  <MDEditor
                    value={field.value}
                    onChange={field.onChange}
                    preview="edit"
                    hideToolbar={false}
                    commands={customCommands}
                    extraCommands={[]}
                    height={300}
                    visibleDragbar={false}
                    textareaProps={{
                      placeholder:
                        'Describe the role, responsibilities, requirements, and what makes this opportunity great...',
                    }}
                    className="custom-md-editor"
                  />
                )}
              />
            ) : (
              <div className="prose prose-invert min-h-75 max-w-none">
                {descriptionValue ? (
                  <MDEditorMarkdown
                    source={descriptionValue}
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
        </div>
        {errors.description && (
          <p className="text-sm text-red-500">{errors.description.message}</p>
        )}
      </div>

      <div className="space-y-2">
        <Label>Required Skills *</Label>
        <div className="mb-2 flex flex-wrap gap-2">
          {selectedSkills.map(skill => (
            <Badge
              key={skill}
              variant="default"
              className="cursor-pointer"
              onClick={() => handleRemoveSkill(skill)}
            >
              {skill}
              <X className="ml-1 h-3 w-3" />
            </Badge>
          ))}
        </div>
        <div className="relative">
          <Input
            placeholder="Add required skills (up to 10)..."
            value={tagInput}
            onChange={e => setTagInput(e.target.value)}
            onKeyDown={e => {
              if (e.key === 'Enter') {
                e.preventDefault();
                handleAddSkill(tagInput.trim());
              }
            }}
          />
        </div>
        <p className="text-muted-foreground text-xs">
          Add up to 10 skills required for this position
        </p>
        {errors.requiredSkills && (
          <p className="text-sm text-red-500">
            {errors.requiredSkills.message}
          </p>
        )}
      </div>

      <div className="border-border flex items-center justify-end gap-3 border-t pt-4">
        <Button type="button" variant="ghost" onClick={() => reset()}>
          Cancel
        </Button>
        <Button type="submit" loading={isPending}>
          <Send className="mr-2 h-4 w-4" />
          Post job
        </Button>
      </div>
    </form>
  );
};

export default JobForm;
