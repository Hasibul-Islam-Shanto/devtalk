import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { mockJobs } from '@/utils/mockdata';
import { Briefcase, MapPin, Search } from 'lucide-react';
import Link from 'next/link';

const JobsHeader = () => {
  return (
    <div>
      <header className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-foreground text-2xl font-semibold">Jobs</h1>
          <p className="text-muted-foreground mt-1 text-sm">
            {mockJobs.length} developer opportunities
          </p>
        </div>
        <Button asChild>
          <Link href="/jobs/create">Post a job</Link>
        </Button>
      </header>

      <div className="mb-6 flex flex-col gap-4 lg:flex-row">
        <div className="relative flex-1">
          <Search className="text-muted-foreground absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2" />
          <Input
            placeholder="Search jobs, companies, skills..."
            className="pl-10"
          />
        </div>
        <div className="flex gap-2">
          <Select>
            <SelectTrigger className="w-36">
              <MapPin className="text-muted-foreground mr-2 h-4 w-4" />
              <SelectValue placeholder="Location" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Locations</SelectItem>
              <SelectItem value="remote">Remote</SelectItem>
              <SelectItem value="onsite">On-site</SelectItem>
              <SelectItem value="hybrid">Hybrid</SelectItem>
            </SelectContent>
          </Select>
          <Select>
            <SelectTrigger className="w-36">
              <Briefcase className="text-muted-foreground mr-2 h-4 w-4" />
              <SelectValue placeholder="Type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Types</SelectItem>
              <SelectItem value="full-time">Full-time</SelectItem>
              <SelectItem value="part-time">Part-time</SelectItem>
              <SelectItem value="contract">Contract</SelectItem>
              <SelectItem value="internship">Internship</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
    </div>
  );
};

export default JobsHeader;
