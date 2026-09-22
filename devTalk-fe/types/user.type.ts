export interface User {
  name: string;
  username: string;
  email: string;
  _id: string;
  id?: string;
  bio: string;
  profileImage: string;
  location: string;
  website: string;
  socialLinks: {
    twitter: string;
    linkedin: string;
    github: string;
  };
  skills: string[];
  isVerified: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface IUserResponse {
  success: boolean;
  user: User;
}
