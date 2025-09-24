import { create } from 'zustand';
import { customToast } from '../components/toast/CustomToastUtils';

interface User {
  id: string;
  email: string;
  nickname: string;
  is_first_login: boolean;
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

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  accessToken: null,
  isLoggedIn: false,

  loginWithProvider: (provider) => {
    window.location.href = `http://localhost:8080/oauth2/authorization/${provider}`;
  },

  setUser: (user, token) => {
    const updatedUser = { ...user, abv_degree: 5.0 };
    set({ user: updatedUser, accessToken: token, isLoggedIn: true });

    customToast.success(`${updatedUser.nickname}님, 로그인 성공 🎉`);
  },

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

  updateUser: async () => {
    try {
      const res = await fetch('http://localhost:8080/api/user/auth/refresh', {
        method: 'POST',
        credentials: 'include',
        headers: { 'Content-Type': 'application/json' },
      });

      if (!res.ok) throw new Error('토큰 갱신 실패');
      const data = await res.json();

      console.log(data);
      // if (data.accessToken && data.user) {
      //   set({ accessToken: data.accessToken, user: data.user, isLoggedIn: true });
      //   console.log('토큰 및 유저 정보 갱신 완료:', data.user);
      //   return data.user;
      // }

      return null;
    } catch (err) {
      console.error('updateUser 실패', err);
      set({ accessToken: null, user: null, isLoggedIn: false });
      return null;
    }
  },
}));
