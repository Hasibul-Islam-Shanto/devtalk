'use client';

import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Briefcase, ChevronDown, MessageSquare, PenLine } from 'lucide-react';
import Link from 'next/link';

const CreateMenu = () => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button className="hidden rounded-full sm:inline-flex">
          Create
          <ChevronDown className="h-4 w-4" aria-hidden />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-48">
        <DropdownMenuItem asChild>
          <Link href="/questions/create">
            <MessageSquare className="h-4 w-4" />
            Ask a question
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem asChild>
          <Link href="/blogs/create">
            <PenLine className="h-4 w-4" />
            Write a blog
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem asChild>
          <Link href="/jobs/create">
            <Briefcase className="h-4 w-4" />
            Post a job
          </Link>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default CreateMenu;
