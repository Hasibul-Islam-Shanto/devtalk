export const DEFAULT_COVER =
  'https://images.unsplash.com/photo-1532256791400-f02a086ca4bd?q=80&w=1811&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D';

export const mockNotifications: {
  id: string;
  type: 'answer' | 'upvote' | 'comment';
  message: string;
  link: string;
  read: boolean;
  createdAt: string;
}[] = [
  {
    id: '1',
    type: 'answer',
    message: 'alexcoder answered your question about useEffect',
    link: '/questions/1',
    read: false,
    createdAt: '2024-11-10T15:00:00Z',
  },
  {
    id: '2',
    type: 'upvote',
    message: 'Your answer received 10 upvotes',
    link: '/questions/2',
    read: false,
    createdAt: '2024-11-10T12:30:00Z',
  },
  {
    id: '3',
    type: 'comment',
    message: 'devmaria commented on your blog post',
    link: '/blog/1',
    read: true,
    createdAt: '2024-11-09T18:00:00Z',
  },
];
