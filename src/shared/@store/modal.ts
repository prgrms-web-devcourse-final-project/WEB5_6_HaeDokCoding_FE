import { create } from 'zustand';

interface WelcomeModalData {
  open: boolean;
  nickname: string;
}

interface ModalStore {
  welcomeModal: WelcomeModalData;

  openWelcomeModal: (nickname: string) => void;
  closeWelcomeModal: () => void;
}

export const useModalStore = create<ModalStore>((set) => ({
  welcomeModal: { open: false, nickname: '' },

  openWelcomeModal: (nickname: string) => set({ welcomeModal: { open: true, nickname } }),

  closeWelcomeModal: () => set({ welcomeModal: { open: false, nickname: '' } }),
}));
