import { create } from 'zustand';

interface ModalState {
  welcomeOpen: boolean;
  openModal: (modal: keyof ModalState) => void;
  closeModal: (modal: keyof ModalState) => void;
}

export const useModalStore = create<ModalState>((set) => ({
  welcomeOpen: false,

  openModal: (modal) => set({ [modal]: true }),
  closeModal: (modal) => set({ [modal]: false }),
}));
