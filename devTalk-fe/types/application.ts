import { Pagination } from './common';
import { Job } from './job';
import { User } from './user.type';

export interface Application {
  _id: string;
  jobId: Job;
  applicantId: User;
  coverLetter: string;
  resumeUrl: string;
  status: 'pending' | 'accepted' | 'rejected';
  createdAt: string;
  updatedAt: string;
}

export interface ApplicationResponse {
  success: boolean;
  message: string;
  application: Application;
}

export interface ApplicationWithRolesResponse {
  success: boolean;
  message: string;
  applicationWithRoles: {
    application: Application;
    isJobOwner: boolean;
    isApplicant: boolean;
  };
}

export interface ApplicationsResponse {
  success: boolean;
  applications: Application[];
  pagination: Pagination;
}
