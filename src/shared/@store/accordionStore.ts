// zustand
import { create } from 'zustand';

// select박스 아코디언 메뉴
export type ID = string | number;

type AccordionState = {
  openByGroup: Record<string, ID | null>;
};

type AccordionAction = {
  setOpen: (group: string, id: ID | null) => void;
  toggle: (group: string, id: ID) => void;
  closeGroup: (group: string) => void;
};

type Accordion = AccordionState & AccordionAction;

export const useAccordionStore = create<Accordion>((set) => ({
  openByGroup: {},
  setOpen: (group, id) => set((s) => ({ openByGroup: { ...s.openByGroup, [group]: id } })),

  // 같은 id가 이미 열려있으면 닫고 id 교체
  toggle: (group, id) =>
    set((s) => {
      const cur = s.openByGroup[group] ?? null;
      return { openByGroup: { ...s.openByGroup, [group]: cur === id ? null : id } };
    }),

  // 선택 후 닫기
  closeGroup: (group) => set((s) => ({ openByGroup: { ...s.openByGroup, [group]: null } })),
}));
