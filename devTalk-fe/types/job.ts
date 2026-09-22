import { Pagination } from './common';
import { User } from './user.type';

export interface JobPostPropsData {
  title: string;
  description: string;
  company: string;
  location: 'Remote' | 'On-site' | 'Hybrid';
  salaryRange: string;
  employmentType: 'Full-time' | 'Part-time' | 'Contract' | 'Internship';
  requiredSkills: string[];
  expiresAt?: Date;
}

export interface Job {
  _id: string;
  title: string;
  description: string;
  company: string;
  location: string;
  employmentType: string;
  salaryRange: string;
  requiredSkills: string[];
  postedBy: User;
  status: string;
  createdAt: string;
  updatedAt: string;
  expiresAt?: string;
}
export interface JobResponse {
  success: boolean;
  message: string;
  job: Job;
}

export interface JobsResponse {
  success: boolean;
  jobs: Job[];
  pagination: Pagination;
}
