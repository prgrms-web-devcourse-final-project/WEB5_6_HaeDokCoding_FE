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
  isAuthChecked: boolean;
  setUser: (user: User) => void;
  logout: () => Promise<void>;
  loginWithProvider: (provider: User['provider']) => void;

  updateUser: () => Promise<User | null>;
  checkAuth: () => Promise<User | null>;
}

const hasAccessToken = typeof document !== 'undefined' && document.cookie.includes('accessToken');

export const useAuthStore = create<AuthState>()((set) => ({
  user: null,
  isLoggedIn: hasAccessToken,
  isAuthChecked: false,

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

      // 상태 초기화
      set({ user: null, isLoggedIn: false, isAuthChecked: true });
    } catch (err) {
      console.error('로그아웃 실패', err);
      set({ user: null, isLoggedIn: false, isAuthChecked: true });
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

  checkAuth: async () => {
    const state = useAuthStore.getState();
    if (!state.isLoggedIn || state.isAuthChecked) return null;

    try {
      const res = await fetch(`${getApi}/user/auth/me`, { method: 'GET', credentials: 'include' });
      if (!res.ok) return set({ user: null, isLoggedIn: false });

      const data = await res.json();
      const userInfo = data?.data?.user;
      if (userInfo) set({ user: userInfo, isLoggedIn: true });

      return userInfo || null;
    } finally {
      set({ isAuthChecked: true });
    }
  },
}));
