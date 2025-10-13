import { getApi } from '@/app/api/config/appConfig';
import { create } from 'zustand';

export interface User {
  id: string;
  email: string;
  nickname: string;
  isFirstLogin: boolean;
  abv_degree?: number;
  provider?: 'naver' | 'kakao' | 'google';
}

interface AuthState {
  user: User | null;
  isLoggedIn: boolean;
  setUser: (user: User) => void;
  logout: () => Promise<void>;
  loginWithProvider: (provider: User['provider']) => void;

  updateUser: () => Promise<User | null>;
  checkAuth: () => Promise<User | null>;
}

export const useAuthStore = create<AuthState>()((set) => ({
  user: null,
  isLoggedIn: false,

  loginWithProvider: (provider) => {
    window.location.href = `${getApi}/oauth2/authorization/${provider}`;
  },

  setUser: (user) => {
    const updatedUser = { ...user, abv_degree: user.abv_degree ?? 5.0 };
    set({ user: updatedUser, isLoggedIn: true });
  },

  // 로그아웃
  logout: async () => {
    try {
      await fetch(`${getApi}/user/auth/logout`, {
        method: 'POST',
        credentials: 'include',
      });
      set({ user: null, isLoggedIn: false });
    } catch (err) {
      console.error('로그아웃 실패', err);
    } finally {
      set({ user: null, isLoggedIn: false });
    }
  },

  // idle + refresh 시 호출
  updateUser: async () => {
    try {
      const res = await fetch(`${getApi}/user/auth/refresh`, {
        method: 'POST',
        credentials: 'include',
        headers: { 'Content-Type': 'application/json' },
      });

      if (!res.ok) throw new Error('토큰 갱신 실패');

      const data = await res.json();
      const userInfo = data?.data?.user;

      if (userInfo) {
        set({ user: userInfo, isLoggedIn: true });
        return userInfo;
      }
      return null;
    } catch (err) {
      console.error('updateUser 실패', err);
      set({ user: null, isLoggedIn: false });
      return null;
    }
  },

  // 시작 시 로그인 상태 확인
  checkAuth: async () => {
    try {
      const res = await fetch(`${getApi}/user/auth/me`, {
        method: 'GET',
        credentials: 'include',
      });
      if (!res.ok) throw new Error('인증 실패');

      const data = await res.json();
      const userInfo = data?.data?.user;
      if (userInfo) {
        set({ user: userInfo, isLoggedIn: true });
        return userInfo;
      }
      return null;
    } catch {
      set({ user: null, isLoggedIn: false });
      return null;
    }
  },
}));
