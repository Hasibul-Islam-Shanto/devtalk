export const mockUsers = [
  {
    id: '1',
    username: 'sarahdev',
    email: 'sarah@example.com',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=sarah',
    bio: 'Full-stack developer passionate about React and TypeScript',
    role: 'Senior Developer',
    skills: ['React', 'TypeScript', 'Node.js', 'GraphQL'],
    createdAt: '2024-01-15T10:00:00Z',
    questionsCount: 12,
    answersCount: 45,
    blogPostsCount: 8,
  },
  {
    id: '2',
    username: 'alexcoder',
    email: 'alex@example.com',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=alex',
    bio: 'Backend engineer specializing in distributed systems',
    role: 'Backend Engineer',
    skills: ['Go', 'Kubernetes', 'PostgreSQL', 'Redis'],
    createdAt: '2024-02-20T14:30:00Z',
    questionsCount: 8,
    answersCount: 92,
    blogPostsCount: 15,
  },
  {
    id: '3',
    username: 'devmaria',
    email: 'maria@example.com',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=maria',
    bio: 'Frontend developer and UI/UX enthusiast',
    role: 'Frontend Developer',
    skills: ['Vue.js', 'Tailwind CSS', 'Figma', 'JavaScript'],
    createdAt: '2024-03-10T09:15:00Z',
    questionsCount: 5,
    answersCount: 23,
    blogPostsCount: 4,
  },
];

export const mockQuestions = [
  {
    id: '1',
    title: 'How to properly implement useEffect cleanup in React 18?',
    content:
      "I'm having trouble understanding when and how to use the cleanup function in useEffect with React 18 strict mode. Can someone explain the best practices?",
    excerpt:
      "I'm having trouble understanding when and how to use the cleanup function in useEffect...",
    tags: ['React', 'TypeScript', 'Hooks'],
    author: mockUsers[0],
    createdAt: '2024-11-10T14:30:00Z',
    updatedAt: '2024-11-10T14:30:00Z',
    upvotes: 42,
    downvotes: 2,
    answersCount: 5,
    views: 234,
    isAnswered: true,
    acceptedAnswerId: '1',
  },
  {
    id: '2',
    title:
      'Best practices for handling authentication with Next.js 14 App Router?',
    content:
      'Looking for recommendations on implementing auth in Next.js 14 with the new App Router. Should I use middleware, server actions, or a combination?',
    excerpt:
      'Looking for recommendations on implementing auth in Next.js 14 with the new App Router...',
    tags: ['Next.js', 'Authentication', 'App Router'],
    author: mockUsers[1],
    createdAt: '2024-11-09T09:15:00Z',
    updatedAt: '2024-11-09T10:20:00Z',
    upvotes: 67,
    downvotes: 1,
    answersCount: 8,
    views: 456,
    isAnswered: true,
  },
  {
    id: '3',
    title: 'Optimizing PostgreSQL queries for large datasets',
    content:
      'My queries are getting slow with millions of rows. What are the best indexing strategies and query optimization techniques?',
    excerpt:
      'My queries are getting slow with millions of rows. What are the best indexing strategies...',
    tags: ['PostgreSQL', 'Database', 'Performance'],
    author: mockUsers[2],
    createdAt: '2024-11-08T16:45:00Z',
    updatedAt: '2024-11-08T16:45:00Z',
    upvotes: 31,
    downvotes: 0,
    answersCount: 3,
    views: 178,
    isAnswered: false,
  },
  {
    id: '4',
    title: 'Understanding TypeScript generics with React components',
    content:
      'Can someone explain how to properly type generic React components? I want to create a reusable Table component.',
    excerpt:
      'Can someone explain how to properly type generic React components? I want to create...',
    tags: ['TypeScript', 'React', 'Generics'],
    author: mockUsers[0],
    createdAt: '2024-11-07T11:00:00Z',
    updatedAt: '2024-11-07T12:30:00Z',
    upvotes: 89,
    downvotes: 3,
    answersCount: 12,
    views: 567,
    isAnswered: true,
  },
];

export const mockAnswers = [
  {
    id: '1',
    questionId: '1',
    content: `In React 18 strict mode, effects are intentionally double-invoked to help catch bugs. Here's how to properly handle cleanup:

\`\`\`typescript
useEffect(() => {
  const controller = new AbortController();
  
  fetchData(controller.signal)
    .then(setData)
    .catch(err => {
      if (err.name !== 'AbortError') {
        setError(err);
      }
    });

  return () => controller.abort();
}, []);
\`\`\`

Key points:
1. Always return a cleanup function for subscriptions and async operations
2. Use AbortController for fetch requests
3. Clean up timers with clearInterval/clearTimeout`,
    author: mockUsers[1],
    createdAt: '2024-11-10T15:00:00Z',
    updatedAt: '2024-11-10T15:00:00Z',
    upvotes: 28,
    downvotes: 0,
    isAccepted: true,
    comments: [],
  },
];

export const mockBlogPosts = [
  {
    id: '1',
    title: 'Building Scalable React Applications with Module Federation',
    content: 'Full article content here...',
    excerpt:
      'Learn how to break down your monolithic React app into independently deployable micro-frontends using Webpack Module Federation.',
    coverImage:
      'https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=800',
    tags: ['React', 'Micro-frontends', 'Architecture'],
    author: mockUsers[0],
    createdAt: '2024-11-08T10:00:00Z',
    updatedAt: '2024-11-08T10:00:00Z',
    readTime: 8,
    likes: 156,
    commentsCount: 23,
  },
  {
    id: '2',
    title: 'The Complete Guide to Go Concurrency Patterns',
    content: 'Full article content here...',
    excerpt:
      'Master goroutines, channels, and advanced concurrency patterns in Go with practical examples.',
    coverImage:
      'https://images.unsplash.com/photo-1516116216624-53e697fedbea?w=800',
    tags: ['Go', 'Concurrency', 'Backend'],
    author: mockUsers[1],
    createdAt: '2024-11-05T14:30:00Z',
    updatedAt: '2024-11-05T14:30:00Z',
    readTime: 12,
    likes: 243,
    commentsCount: 45,
  },
  {
    id: '3',
    title: 'CSS Grid vs Flexbox: When to Use Which',
    content: 'Full article content here...',
    excerpt:
      'A practical comparison of CSS Grid and Flexbox with real-world examples to help you choose the right tool.',
    coverImage:
      'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800',
    tags: ['CSS', 'Frontend', 'Web Design'],
    author: mockUsers[2],
    createdAt: '2024-11-03T09:00:00Z',
    updatedAt: '2024-11-03T09:00:00Z',
    readTime: 6,
    likes: 98,
    commentsCount: 12,
  },
];

export const mockJobs = [
  {
    id: '1',
    title: 'Senior Frontend Engineer',
    company: 'TechCorp',
    companyLogo: 'https://api.dicebear.com/7.x/identicon/svg?seed=techcorp',
    location: 'San Francisco, CA',
    locationType: 'hybrid',
    jobType: 'full-time',
    salaryMin: 150000,
    salaryMax: 200000,
    salaryCurrency: 'USD',
    description:
      'We are looking for a Senior Frontend Engineer to join our growing team. You will be working on our flagship product using React, TypeScript, and GraphQL.\n\nResponsibilities:\n- Lead frontend architecture decisions\n- Mentor junior developers\n- Implement new features and optimize existing ones\n- Collaborate with design and backend teams',
    requirements: [
      '5+ years React experience',
      'Strong TypeScript skills',
      'GraphQL knowledge',
      'Team leadership experience',
    ],
    tags: ['React', 'TypeScript', 'GraphQL', 'Senior'],
    openings: 2,
    deadline: '2024-12-31T23:59:59Z',
    postedBy: mockUsers[0],
    createdAt: '2024-11-01T10:00:00Z',
    applicationsCount: 45,
    isActive: true,
    views: 234,
  },
  {
    id: '2',
    title: 'Backend Developer - Go',
    company: 'StartupXYZ',
    companyLogo: 'https://api.dicebear.com/7.x/identicon/svg?seed=startupxyz',
    location: 'Remote',
    locationType: 'remote',
    jobType: 'full-time',
    salaryMin: 120000,
    salaryMax: 160000,
    salaryCurrency: 'USD',
    description:
      'Join our backend team to build scalable microservices using Go. Remote-first culture with flexible hours.',
    requirements: [
      '3+ years Go experience',
      'Microservices architecture',
      'Kubernetes',
      'PostgreSQL',
    ],
    tags: ['Go', 'Kubernetes', 'Microservices', 'Remote'],
    openings: 3,
    deadline: '2024-12-15T23:59:59Z',
    postedBy: mockUsers[1],
    createdAt: '2024-10-28T14:00:00Z',
    applicationsCount: 78,
    isActive: true,
    views: 456,
  },
  {
    id: '3',
    title: 'Full Stack Developer Intern',
    company: 'DevAgency',
    companyLogo: 'https://api.dicebear.com/7.x/identicon/svg?seed=devagency',
    location: 'New York, NY',
    locationType: 'onsite',
    jobType: 'internship',
    salaryMin: 25,
    salaryMax: 35,
    salaryCurrency: 'USD/hr',
    description:
      'Great opportunity for students or recent graduates to learn full stack development in a fast-paced agency environment.',
    requirements: [
      'Basic JavaScript knowledge',
      'Familiarity with React',
      'Eager to learn',
      'Good communication',
    ],
    tags: ['JavaScript', 'React', 'Node.js', 'Internship'],
    openings: 5,
    deadline: '2024-12-01T23:59:59Z',
    postedBy: mockUsers[2],
    createdAt: '2024-10-25T09:00:00Z',
    applicationsCount: 120,
    isActive: true,
    views: 789,
  },
];

export const mockJobApplications = [
  {
    id: 'app1',
    jobId: '1',
    applicantName: 'John Smith',
    applicantEmail: 'john.smith@email.com',
    resumeUrl: 'https://example.com/resume.pdf',
    coverLetter:
      'I am very excited about this opportunity and believe my 6 years of React experience make me a great fit.',
    appliedAt: '2024-11-05T10:00:00Z',
    status: 'reviewed',
  },
  {
    id: 'app2',
    jobId: '1',
    applicantName: 'Emily Chen',
    applicantEmail: 'emily.chen@email.com',
    resumeUrl: 'https://example.com/resume2.pdf',
    coverLetter:
      'As a passionate frontend developer with expertise in TypeScript and GraphQL, I would love to contribute to your team.',
    appliedAt: '2024-11-06T14:30:00Z',
    status: 'pending',
  },
  {
    id: 'app3',
    jobId: '1',
    applicantName: 'Michael Brown',
    applicantEmail: 'michael.b@email.com',
    appliedAt: '2024-11-07T09:15:00Z',
    status: 'shortlisted',
  },
];

export const mockTags = [
  {
    name: 'React',
    count: 1234,
    description: 'A JavaScript library for building user interfaces',
  },
  {
    name: 'TypeScript',
    count: 987,
    description: 'Typed superset of JavaScript',
  },
  {
    name: 'Node.js',
    count: 756,
    description: "JavaScript runtime built on Chrome's V8 engine",
  },
  {
    name: 'Next.js',
    count: 654,
    description: 'React framework for production',
  },
  {
    name: 'PostgreSQL',
    count: 543,
    description: 'Open source relational database',
  },
  {
    name: 'Go',
    count: 432,
    description: 'Statically typed, compiled programming language',
  },
  {
    name: 'Python',
    count: 876,
    description: 'High-level programming language',
  },
  {
    name: 'Docker',
    count: 567,
    description: 'Platform for containerized applications',
  },
];

export const currentUser = mockUsers[0];
