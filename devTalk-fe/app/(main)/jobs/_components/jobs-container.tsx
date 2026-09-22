import { Job, JobsResponse } from '@/types/job';
import JobCard from './job-card';
import { SectionError } from '@/components/Errors';
import { EmptyState } from '@/components/ui/empty-state';
import { get } from '@/utils/methods';
import { Briefcase } from 'lucide-react';

const JobsContainer = async () => {
  let jobs: Job[] | null = null;
  let error = null;

  try {
    const response = await get<JobsResponse>('/api/jobs', {
      retry: 2,
      timeout: 5000,
    });
    if (response.success) {
      jobs = response.jobs;
    }
  } catch (err) {
    error = err;
  }

  if (error) {
    return (
      <SectionError
        title="Jobs"
        message="Unable to load jobs right now. Please try again."
      />
    );
  }

  if (!jobs || jobs.length === 0) {
    return (
      <EmptyState
        icon={Briefcase}
        title="No jobs yet"
        description="Post a role when you are ready to hire."
        actionLabel="Post a job"
        actionHref="/jobs/create"
      />
    );
  }

  return (
    <div className="space-y-4">
      {jobs?.map(job => (
        <JobCard key={job._id} job={job} />
      ))}
    </div>
  );
};

export default JobsContainer;
