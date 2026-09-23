import { get } from '@/utils/methods';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { loadJobApplications } from './load-job-applications';

vi.mock('@/utils/methods', () => ({
  get: vi.fn(),
}));

const mockedGet = vi.mocked(get);

describe('loadJobApplications', () => {
  beforeEach(() => {
    mockedGet.mockReset();
  });

  it('returns the job error without requesting applications', async () => {
    mockedGet.mockRejectedValueOnce(new Error('Job missing'));

    const result = await loadJobApplications('job-1', 1, 'token');

    expect(result.jobError).toEqual(new Error('Job missing'));
    expect(result.job).toBeNull();
    expect(mockedGet).toHaveBeenCalledTimes(1);
  });

  it('skips applications when the job payload is empty', async () => {
    mockedGet.mockResolvedValueOnce({});

    const result = await loadJobApplications('job-1', 1, 'token');

    expect(result.job).toBeUndefined();
    expect(mockedGet).toHaveBeenCalledTimes(1);
  });

  it('returns the list error after the job loads', async () => {
    mockedGet
      .mockResolvedValueOnce({ job: { _id: 'job-1', title: 'Role' } })
      .mockRejectedValueOnce('Not allowed');

    const result = await loadJobApplications('job-1', 2, 'token');

    expect(result.job).toEqual({ _id: 'job-1', title: 'Role' });
    expect(result.listError).toBe('Not allowed');
    expect(mockedGet).toHaveBeenNthCalledWith(
      2,
      '/api/applications/job/job-1',
      {
        isAuthenticated: true,
        token: 'token',
        params: { page: 2, limit: 10 },
      },
    );
  });

  it('returns applications and defaults missing list fields', async () => {
    mockedGet
      .mockResolvedValueOnce({ job: { _id: 'job-1' } })
      .mockResolvedValueOnce({});

    const result = await loadJobApplications('job-1', 1, 'token');

    expect(result.applications).toEqual([]);
    expect(result.pagination).toBeNull();
    expect(result.listError).toBeNull();
  });
});
