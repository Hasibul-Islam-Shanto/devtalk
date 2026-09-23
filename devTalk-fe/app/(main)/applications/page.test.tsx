import { render, screen } from '@testing-library/react';
import { cookies } from 'next/headers';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { Job } from '@/types/job';
import { loadJobApplications } from './_lib/load-job-applications';
import ApplicationsPage from './page';

vi.mock('next/link', () => ({
  default: ({
    href,
    children,
  }: {
    href: string;
    children: React.ReactNode;
  }) => <a href={href}>{children}</a>,
}));

vi.mock('next/headers', () => ({
  cookies: vi.fn(),
}));

vi.mock('./_lib/load-job-applications', () => ({
  loadJobApplications: vi.fn(),
}));

const job = {
  _id: 'job-1',
  title: 'Frontend Engineer',
  company: 'Acme',
} as Job;

const mockedCookies = vi.mocked(cookies);
const mockedLoad = vi.mocked(loadJobApplications);

describe('ApplicationsPage', () => {
  beforeEach(() => {
    mockedCookies.mockResolvedValue({
      get: (name: string) =>
        name === 'accessToken' ? { name, value: 'token-1' } : undefined,
    } as Awaited<ReturnType<typeof cookies>>);
    mockedLoad.mockResolvedValue({
      job,
      applications: [],
      pagination: null,
      listError: null,
      jobError: null,
    });
  });

  it('shows the missing-job state when jobId is absent', async () => {
    render(
      await ApplicationsPage({
        searchParams: Promise.resolve({}),
      }),
    );

    expect(
      screen.getByRole('heading', { name: 'Job applications' }),
    ).toBeInTheDocument();
    expect(mockedLoad).not.toHaveBeenCalled();
  });

  it('loads the requested page with the access token', async () => {
    render(
      await ApplicationsPage({
        searchParams: Promise.resolve({ jobId: 'job-1', page: '3' }),
      }),
    );

    expect(mockedLoad).toHaveBeenCalledWith('job-1', 3, 'token-1');
    expect(
      screen.getByText('No applications yet for this job.'),
    ).toBeInTheDocument();
  });

  it('uses the first page when the page query is invalid or missing', async () => {
    render(
      await ApplicationsPage({
        searchParams: Promise.resolve({ jobId: 'job-1', page: 'nope' }),
      }),
    );

    expect(mockedLoad).toHaveBeenCalledWith('job-1', 1, 'token-1');
  });

  it('sends an empty token when the cookie is missing', async () => {
    mockedCookies.mockResolvedValue({
      get: () => undefined,
    } as Awaited<ReturnType<typeof cookies>>);

    render(
      await ApplicationsPage({
        searchParams: Promise.resolve({ jobId: 'job-1' }),
      }),
    );

    expect(mockedLoad).toHaveBeenCalledWith('job-1', 1, '');
  });

  it('shows the job error and the list error states', async () => {
    mockedLoad.mockResolvedValueOnce({
      job: null,
      applications: [],
      pagination: null,
      listError: null,
      jobError: new Error('Missing job'),
    });

    const { rerender } = render(
      await ApplicationsPage({
        searchParams: Promise.resolve({ jobId: 'job-1' }),
      }),
    );
    expect(screen.getByText('Missing job')).toBeInTheDocument();

    mockedLoad.mockResolvedValueOnce({
      job: null,
      applications: [],
      pagination: null,
      listError: null,
      jobError: null,
    });
    rerender(
      await ApplicationsPage({
        searchParams: Promise.resolve({ jobId: 'job-1' }),
      }),
    );
    expect(screen.getByText('Unable to load this job.')).toBeInTheDocument();

    mockedLoad.mockResolvedValueOnce({
      job,
      applications: [],
      pagination: null,
      listError: 'Not the owner',
      jobError: null,
    });
    rerender(
      await ApplicationsPage({
        searchParams: Promise.resolve({ jobId: 'job-1' }),
      }),
    );
    expect(screen.getByText('Not the owner')).toBeInTheDocument();
  });
});
