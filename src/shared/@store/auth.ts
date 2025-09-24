import { create } from 'zustand';
import { customToast } from '../components/toast/CustomToastUtils';

interface User {
  id: string;
  email: string;
  nickname: string;
  abv_degree?: number;
  provider?: 'naver' | 'kakao' | 'google';
}

interface AuthState {
  user: User | null;
  accessToken: string | null;
  isLoggedIn: boolean;
  setUser: (user: User, token: string) => void;
  logout: () => Promise<void>;
  refreshToken: () => Promise<void>;
  loginWithProvider: (provider: User['provider']) => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  accessToken: null,
  isLoggedIn: false,

  loginWithProvider: (provider) => {
    window.location.href = `http://localhost:8080/oauth2/authorization/${provider}`;
  },

  setUser: (user, token) => set({ user, accessToken: token, isLoggedIn: true }),

  logout: async () => {
    try {
      await fetch('http://localhost:8080/api/user/auth/logout', {
        method: 'POST',
        credentials: 'include',
      });

      customToast.success('로그아웃 되었습니다.');
      set({ user: null, accessToken: null, isLoggedIn: false });
    } catch (err) {
      customToast.error('로그아웃 실패❌ \n 다시 시도해주세요.');
      console.error('로그아웃 실패', err);
    }
  },

  refreshToken: async () => {
    try {
      const res = await fetch('http://localhost:8080/api/user/auth/refresh', {
        method: 'POST',
        credentials: 'include',
      });
      if (!res.ok) throw new Error('토큰 갱신 실패');

      const result = await res.json();
      if (result.code === 0) {
        set({ isLoggedIn: true, user: result.data.user });
        customToast.success(`환영합니다😊 \n ${result.data.user.nickname}님`);
      } else {
        throw new Error(result.message || '토큰 갱신 실패');
      }
    } catch (err) {
      console.error(err);
      set({ user: null, accessToken: null, isLoggedIn: false });
    }
  },
}));
