import { render, screen } from '@testing-library/react';
import { Application } from '@/types/application';
import { Pagination } from '@/types/common';
import { Job } from '@/types/job';
import { describe, expect, it, vi } from 'vitest';
import {
  ApplicationsLoadError,
  JobApplicationsView,
  JobNotFound,
  MissingJobId,
} from './job-applications-view';

vi.mock('next/link', () => ({
  default: ({
    href,
    children,
  }: {
    href: string;
    children: React.ReactNode;
  }) => <a href={href}>{children}</a>,
}));

const job = {
  _id: 'job-1',
  title: 'Frontend Engineer',
  company: 'Acme',
} as Job;

const pagination = {
  currentPage: 2,
  totalPages: 4,
  totalItems: 31,
  limit: 10,
  hasNextPage: true,
  hasPrevPage: true,
} satisfies Pagination;

function application(overrides: Partial<Application> = {}): Application {
  return {
    _id: 'app-1',
    coverLetter: 'I would like to join the team.',
    resumeUrl: 'https://files.example/resume.pdf',
    status: 'pending',
    createdAt: '2026-09-01T00:00:00.000Z',
    updatedAt: '2026-09-01T00:00:00.000Z',
    jobId: job,
    applicantId: {
      name: 'Ada Lovelace',
      username: 'ada',
      email: 'ada@example.com',
    },
    ...overrides,
  } as Application;
}

describe('job application states', () => {
  it('asks for a job id when the page is opened without one', () => {
    render(<MissingJobId />);

    expect(
      screen.getByRole('heading', { name: 'Job applications' }),
    ).toBeInTheDocument();
    expect(screen.getByRole('link', { name: 'Browse jobs' })).toHaveAttribute(
      'href',
      '/jobs',
    );
  });

  it('shows a readable job error', () => {
    const { rerender } = render(<JobNotFound jobError={null} />);
    expect(screen.getByText('Unable to load this job.')).toBeInTheDocument();

    rerender(<JobNotFound jobError="Job was removed" />);
    expect(screen.getByText('Job was removed')).toBeInTheDocument();

    rerender(<JobNotFound jobError={new Error('Network down')} />);
    expect(screen.getByText('Network down')).toBeInTheDocument();

    rerender(<JobNotFound jobError={{ status: 404 }} />);
    expect(screen.getByText('Unable to load this job.')).toBeInTheDocument();
    expect(screen.queryByText('[object Object]')).not.toBeInTheDocument();
  });

  it('shows the job and a readable list error', () => {
    render(
      <ApplicationsLoadError
        job={job}
        jobId="job/1"
        listError={new Error('Forbidden')}
      />,
    );

    expect(
      screen.getByRole('heading', { name: 'Frontend Engineer' }),
    ).toBeInTheDocument();
    expect(screen.getByText('Acme')).toBeInTheDocument();
    expect(screen.getByText('Forbidden')).toBeInTheDocument();
    expect(screen.getByRole('link', { name: 'Back to job' })).toHaveAttribute(
      'href',
      '/jobs/job/1',
    );
  });

  it('falls back when the list error is not text', () => {
    render(<ApplicationsLoadError job={job} jobId="job-1" listError={{}} />);

    expect(screen.getByText('Unknown error')).toBeInTheDocument();
  });
});

describe('JobApplicationsView', () => {
  it('shows an empty state', () => {
    render(
      <JobApplicationsView
        job={job}
        jobId="job-1"
        applications={[]}
        pagination={null}
      />,
    );

    expect(
      screen.getByText('No applications yet for this job.'),
    ).toBeInTheDocument();
    expect(screen.getByText('0 applications')).toBeInTheDocument();
  });

  it('labels a single application when pagination is missing', () => {
    render(
      <JobApplicationsView
        job={job}
        jobId="job-1"
        applications={[application({ coverLetter: '', resumeUrl: '' })]}
        pagination={null}
      />,
    );

    expect(screen.getByText('1 application')).toBeInTheDocument();
    expect(
      screen.queryByRole('link', { name: 'Resume' }),
    ).not.toBeInTheDocument();
    expect(
      screen.queryByText('I would like to join the team.'),
    ).not.toBeInTheDocument();
  });

  it('renders applicant details, resume, and pagination links', () => {
    render(
      <JobApplicationsView
        job={job}
        jobId="job/1"
        applications={[
          application(),
          application({
            _id: 'app-2',
            coverLetter: '',
            resumeUrl: '',
            applicantId: {
              name: '   ',
              username: 'grace',
              email: '',
            },
            status: 'accepted',
          } as Partial<Application>),
          application({
            _id: 'app-3',
            coverLetter: '',
            resumeUrl: '',
            applicantId: {
              name: '',
              username: '',
              email: 'linus@example.com',
            },
          } as Partial<Application>),
          application({
            _id: 'app-4',
            coverLetter: '',
            resumeUrl: '',
            applicantId: {
              name: '',
              username: '',
              email: '',
            },
          } as Partial<Application>),
        ]}
        pagination={pagination}
      />,
    );

    expect(screen.getByText('31 total')).toBeInTheDocument();
    expect(screen.getByText('Ada Lovelace')).toBeInTheDocument();
    expect(screen.getByText('ada@example.com')).toBeInTheDocument();
    expect(
      screen.getByText('I would like to join the team.'),
    ).toBeInTheDocument();
    expect(screen.getByText('grace')).toBeInTheDocument();
    expect(screen.getAllByText('linus@example.com')).toHaveLength(2);
    expect(screen.getByText('Applicant')).toBeInTheDocument();
    expect(screen.getByRole('link', { name: 'Resume' })).toHaveAttribute(
      'href',
      'https://files.example/resume.pdf',
    );
    expect(screen.getByRole('link', { name: 'Previous' })).toHaveAttribute(
      'href',
      '/applications?jobId=job%2F1&page=1',
    );
    expect(screen.getByRole('link', { name: 'Next' })).toHaveAttribute(
      'href',
      '/applications?jobId=job%2F1&page=3',
    );
    expect(
      screen.getAllByRole('link', { name: 'View details' })[0],
    ).toHaveAttribute('href', '/applications/app-1');
  });

  it('disables pagination controls on the only page ends', () => {
    render(
      <JobApplicationsView
        job={job}
        jobId="job-1"
        applications={[application(), application({ _id: 'app-2' })]}
        pagination={{
          ...pagination,
          totalItems: 2,
          hasNextPage: false,
          hasPrevPage: false,
        }}
      />,
    );

    expect(screen.getByRole('button', { name: 'Previous' })).toBeDisabled();
    expect(screen.getByRole('button', { name: 'Next' })).toBeDisabled();
  });

  it('hides pagination when there is a single page', () => {
    render(
      <JobApplicationsView
        job={job}
        jobId="job-1"
        applications={[application()]}
        pagination={{ ...pagination, totalPages: 1, totalItems: 1 }}
      />,
    );

    expect(screen.queryByText(/Page /)).not.toBeInTheDocument();
  });
});
