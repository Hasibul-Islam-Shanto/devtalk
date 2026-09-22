import { ArrowUp, MessageSquare, Bookmark, Clock, Eye } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Question } from '@/types/question';
import { formatDistanceToNow } from 'date-fns/formatDistanceToNow';

const QuestionCard = ({ question }: { question: Question }) => {
  return (
    <article className="border-border bg-card hover:border-primary/40 rounded-lg border p-4 transition-colors duration-150 sm:p-5">
      <div className="flex gap-4">
        <div className="flex min-w-15 flex-col items-center gap-1 text-center">
          <Button
            variant="ghost"
            size="icon-sm"
            className="text-muted-foreground hover:text-primary"
          >
            <ArrowUp className="h-5 w-5" />
          </Button>
          <span className="text-foreground text-lg font-semibold">{0}</span>
          <span className="text-muted-foreground text-xs">votes</span>
        </div>

        <div className="min-w-0 flex-1">
          <div className="flex items-start gap-2">
            <Link
              href={`/questions/${question._id}`}
              className="text-foreground hover:text-primary line-clamp-2 flex-1 text-lg font-semibold transition-colors"
            >
              {question.title}
            </Link>
          </div>
          <p className="text-muted-foreground mt-1 line-clamp-2 text-sm">
            {question.description}
          </p>

          <div className="mt-3 flex flex-wrap gap-2">
            {question.tags.map((tag: string) => (
              <Badge key={tag}>{tag}</Badge>
            ))}
          </div>

          <div className="text-muted-foreground mt-4 flex items-center gap-4 text-sm">
            <div className="flex items-center gap-2">
              <Avatar>
                <AvatarImage
                  src="https://github.com/shadcn.png"
                  alt="@shadcn"
                />
                <AvatarFallback>CN</AvatarFallback>
              </Avatar>
              <span>{question.askedBy.username}</span>
            </div>
            <div className="flex items-center gap-1">
              <Clock className="h-4 w-4" />
              <span>
                {formatDistanceToNow(new Date(question.createdAt))} ago
              </span>
            </div>
            <div className="flex items-center gap-1">
              <MessageSquare className="h-4 w-4" />
              {0} answers
            </div>
            <div className="flex items-center gap-1">
              <Eye className="h-4 w-4" />
              {0} views
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-2">
          <Button variant="ghost" size="icon-sm">
            <Bookmark className={`h-4 w-4 fill-current`} />
          </Button>
        </div>
      </div>
    </article>
  );
};

export default QuestionCard;
