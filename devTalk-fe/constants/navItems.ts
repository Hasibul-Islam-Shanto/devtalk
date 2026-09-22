export const MAIN_NAV_ITEMS = [
  { label: 'Home', slug: 'HOME', href: '/', icon: 'Home' },
  {
    label: 'Questions',
    slug: 'QUESTIONS',
    href: '/questions',
    icon: 'MessageSquare',
  },
  { label: 'Blogs', slug: 'BLOGS', href: '/blogs', icon: 'BookOpen' },
  { label: 'Jobs', slug: 'JOBS', href: '/jobs', icon: 'Briefcase' },
  {
    label: 'Applications',
    slug: 'APPLICATIONS',
    href: '/applications',
    icon: 'ClipboardList',
  },
  {
    label: 'Notifications',
    slug: 'NOTIFICATIONS',
    href: '/notifications',
    icon: 'Bell',
  },
] as const;

export const PRIMARY_NAV_ITEMS = MAIN_NAV_ITEMS.filter(
  item => item.slug !== 'NOTIFICATIONS',
);

export const ACCOUNT_NAV_ITEMS = [
  { label: 'Profile', slug: 'PROFILE', href: '/profile', icon: 'User' },
  {
    label: 'Settings',
    slug: 'SETTINGS',
    href: '/settings',
    icon: 'Settings',
  },
] as const;
