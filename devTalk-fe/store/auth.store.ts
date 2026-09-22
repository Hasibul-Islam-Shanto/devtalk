import { User } from '@/types/user.type';
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface AuthState {
  user: User | null;
  isLoggedIn: boolean;
  isLoading: boolean;
  setUser: (user: User | null) => void;
  setLoading: (loading: boolean) => void;
  logout: () => void;
}
export const useAuthStore = create<AuthState>()(
  persist(
    set => ({
      user: null,
      isLoggedIn: false,
      isLoading: true,
      setUser: user =>
        set(() => ({
          user,
          isLoggedIn: !!user,
          isLoading: false,
        })),
      setLoading: loading => set(() => ({ isLoading: loading })),
      logout: () =>
        set(() => ({
          user: null,
          isLoggedIn: false,
          isLoading: false,
        })),
    }),
    {
      name: 'auth-storage',
      partialize(state) {
        return { user: state.user, isLoggedIn: state.isLoggedIn };
      },
    },
  ),
);
