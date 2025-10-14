// auth.ts
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

export const useAuthStore = create<AuthState>()((set, get) => ({
  user: null,
  isLoggedIn: false,
  isAuthChecked: false,

  loginWithProvider: (provider) => {
    window.location.href = `${getApi}/oauth2/authorization/${provider}`;
  },

  setUser: (user) => {
    const updatedUser = { ...user, abv_degree: user.abv_degree ?? 5.0 };
    set({
      user: updatedUser,
      isLoggedIn: true,
      isAuthChecked: true,
    });
  },

  logout: async () => {
    try {
      await fetch(`${getApi}/user/auth/logout`, {
        method: 'POST',
        credentials: 'include',
      });

      set({ user: null, isLoggedIn: false, isAuthChecked: true });

      // 로그아웃 후 로그인 페이지로 리다이렉트
      window.location.href = '/login';
    } catch (err) {
      console.error('로그아웃 실패', err);
      set({ user: null, isLoggedIn: false, isAuthChecked: true });
    }
  },

  updateUser: async () => {
    try {
      const res = await fetch(`${getApi}/user/auth/refresh`, {
        method: 'POST',
        credentials: 'include',
        headers: { 'Content-Type': 'application/json' },
      });

      // 200 응답 기대
      if (!res.ok) {
        set({ user: null, isLoggedIn: false });
        return null;
      }

      const data = await res.json();
      const userInfo = data?.data?.user;

      if (userInfo) {
        const updatedUser = { ...userInfo, abv_degree: userInfo.abv_degree ?? 5.0 };
        set({ user: updatedUser, isLoggedIn: true });
        return updatedUser;
      }

      set({ user: null, isLoggedIn: false });
      return null;
    } catch (err) {
      console.error('updateUser 실패', err);
      set({ user: null, isLoggedIn: false });
      return null;
    }
  },

  checkAuth: async () => {
    const { isAuthChecked } = get();

    // 이미 체크했으면 현재 user 반환
    if (isAuthChecked) {
      return get().user;
    }

    try {
      const res = await fetch(`${getApi}/user/auth/me`, {
        method: 'GET',
        credentials: 'include',
      });

      // 항상 200 응답 기대
      if (!res.ok) {
        set({ user: null, isLoggedIn: false, isAuthChecked: true });
        return null;
      }

      const data = await res.json();
      const userInfo = data?.data?.user || null;

      if (userInfo) {
        const updatedUser = { ...userInfo, abv_degree: userInfo.abv_degree ?? 5.0 };
        set({ user: updatedUser, isLoggedIn: true, isAuthChecked: true });
        return updatedUser;
      }

      // user가 null이어도 정상 응답
      set({ user: null, isLoggedIn: false, isAuthChecked: true });
      return null;
    } catch (err) {
      console.error('checkAuth 실패', err);
      set({ user: null, isLoggedIn: false, isAuthChecked: true });
      return null;
    }
  },
}));
