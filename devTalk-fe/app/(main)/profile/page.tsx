import { SectionError } from '@/components/Errors';
import { APP_NAME } from '@/constants/brand';
import { IUserResponse, User } from '@/types/user.type';
import { get } from '@/utils/methods';
import { cookies } from 'next/headers';
import ProfileDetails from './_components/profile-details';
import ProfileActivity from './_components/profile-activity';

const ProfilePage = async () => {
  let user: User | null = null;
  let error: unknown = null;
  const cookieStore = await cookies();

  try {
    const response = await get<IUserResponse>('/api/users/profile', {
      isAuthenticated: true,
      token: cookieStore.get('accessToken')?.value || '',
    });
    user = response.user;
  } catch (err) {
    error = err;
  }

  if (error) {
    return (
      <div className="mx-auto max-w-4xl p-4 py-12 lg:p-6">
        <SectionError
          title="Could not load profile"
          message="Sign in and try again, or refresh the page."
        />
      </div>
    );
  }

  if (!user) {
    return (
      <div className="mx-auto max-w-4xl space-y-3 p-4 py-12 text-center lg:p-6">
        <p className="text-muted-foreground text-sm">
          No profile data available.
        </p>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-4xl space-y-8 p-4 pb-12 lg:p-6">
      <header>
        <h1 className="text-foreground text-2xl font-semibold tracking-tight">
          Profile
        </h1>
        <p className="text-muted-foreground mt-1 max-w-lg text-sm leading-relaxed">
          Your {APP_NAME} identity, skills, and recent questions, posts, and
          jobs.
        </p>
      </header>

      <ProfileDetails user={user} />
      <ProfileActivity />
    </div>
  );
};

export default ProfilePage;
