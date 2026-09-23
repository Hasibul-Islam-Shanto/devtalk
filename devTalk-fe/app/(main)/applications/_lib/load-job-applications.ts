import { Application, ApplicationsResponse } from '@/types/application';
import { Job } from '@/types/job';
import { get } from '@/utils/methods';

export type JobApplicationsData = {
  job: Job | null;
  applications: Application[];
  pagination: ApplicationsResponse['pagination'] | null;
  listError: unknown;
  jobError: unknown;
};

export async function loadJobApplications(
  jobId: string,
  page: number,
  token: string,
): Promise<JobApplicationsData> {
  let job: Job | null = null;
  let applications: Application[] = [];
  let pagination: ApplicationsResponse['pagination'] | null = null;
  let listError: unknown = null;
  let jobError: unknown = null;

  try {
    const jobRes = await get<{ job: Job }>(`/api/jobs/${jobId}`, {
      retry: 1,
      timeout: 8000,
    });
    job = jobRes.job;
  } catch (err) {
    jobError = err;
  }

  if (!jobError && job) {
    try {
      const response = await get<ApplicationsResponse>(
        `/api/applications/job/${jobId}`,
        {
          isAuthenticated: true,
          token,
          params: { page, limit: 10 },
        },
      );
      applications = response.applications ?? [];
      pagination = response.pagination ?? null;
    } catch (err) {
      listError = err;
    }
  }

  return { job, applications, pagination, listError, jobError };
}
