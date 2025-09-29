import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface User {
  id: string;
  email: string;
  nickname: string;
  isFirstLogin: boolean;
  abv_degree?: number;
  provider?: 'naver' | 'kakao' | 'google';
}

interface AuthState {
  user: User | null;
  accessToken: string | null;
  isLoggedIn: boolean;
  setUser: (user: User, token: string) => void;
  logout: () => Promise<void>;
  loginWithProvider: (provider: User['provider']) => void;

  updateUser: () => Promise<User | null>;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      accessToken: null,
      isLoggedIn: false,

      loginWithProvider: (provider) => {
        window.location.href = `http://localhost:8080/oauth2/authorization/${provider}`;
      },

      setUser: (user, token) => {
        const updatedUser = { ...user, abv_degree: 5.0 };
        set({ user: updatedUser, accessToken: token, isLoggedIn: true });
      },

      logout: async () => {
        try {
          await fetch('http://localhost:8080/user/auth/logout', {
            method: 'POST',
            credentials: 'include',
          });
          set({ user: null, accessToken: null, isLoggedIn: false });
        } catch (err) {
          console.error('로그아웃 실패', err);
        }
      },

      updateUser: async () => {
        try {
          const res = await fetch('http://localhost:8080/user/auth/refresh', {
            method: 'POST',
            credentials: 'include',
            headers: { 'Content-Type': 'application/json' },
          });

          if (!res.ok) throw new Error('토큰 갱신 실패');
          const data = await res.json();
          const userInfo = data?.data?.user;
          const accessToken = data?.data?.accessToken;

          if (userInfo && accessToken) {
            set({ user: userInfo, accessToken, isLoggedIn: true });
            return userInfo;
          }
          return null;
        } catch (err) {
          console.error('updateUser 실패', err);
          set({ accessToken: null, user: null, isLoggedIn: false });
          return null;
        }
      },
    }),
    { name: 'auth-storage' } // localStorage key
  )
);
