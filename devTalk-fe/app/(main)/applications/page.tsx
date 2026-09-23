import { cookies } from 'next/headers';
import {
  ApplicationsLoadError,
  JobApplicationsView,
  JobNotFound,
  MissingJobId,
} from './_components/job-applications-view';
import { loadJobApplications } from './_lib/load-job-applications';

type PageProps = {
  searchParams: Promise<{ jobId?: string; page?: string }>;
};

export default async function ApplicationsPage({
  searchParams,
}: Readonly<PageProps>) {
  const { jobId, page: pageParam } = await searchParams;

  if (!jobId) {
    return <MissingJobId />;
  }

  const cookieStore = await cookies();
  const token = cookieStore.get('accessToken')?.value || '';
  const page = Math.max(1, Number.parseInt(pageParam || '1', 10) || 1);
  const data = await loadJobApplications(jobId, page, token);

  if (data.jobError || !data.job) {
    return <JobNotFound jobError={data.jobError} />;
  }

  if (data.listError) {
    return (
      <ApplicationsLoadError
        job={data.job}
        jobId={jobId}
        listError={data.listError}
      />
    );
  }

  return (
    <JobApplicationsView
      job={data.job}
      jobId={jobId}
      applications={data.applications}
      pagination={data.pagination}
    />
  );
}
