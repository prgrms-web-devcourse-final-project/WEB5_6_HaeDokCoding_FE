import { create } from 'zustand';

interface WelcomeModalData {
  open: boolean;
  nickname: string;
}

interface LogoutConfirmModalData {
  open: boolean;
}

interface ModalStore {
  welcomeModal: WelcomeModalData;
  logoutConfirmModal: LogoutConfirmModalData;

  openWelcomeModal: (nickname: string) => void;
  closeWelcomeModal: () => void;

  openLogoutConfirmModal: () => void;
  closeLogoutConfirmModal: () => void;
}

export const useModalStore = create<ModalStore>((set) => ({
  welcomeModal: { open: false, nickname: '' },
  logoutConfirmModal: { open: false },

  openWelcomeModal: (nickname: string) => set({ welcomeModal: { open: true, nickname } }),

  closeWelcomeModal: () => set({ welcomeModal: { open: false, nickname: '' } }),

  openLogoutConfirmModal: () => set({ logoutConfirmModal: { open: true } }),
  closeLogoutConfirmModal: () => set({ logoutConfirmModal: { open: false } }),
}));
