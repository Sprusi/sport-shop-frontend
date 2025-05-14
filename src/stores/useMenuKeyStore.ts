import { create } from 'zustand';

type Store = {
  menuKey: string;
  setMenuKey: (key: string) => void;
};

export const useMenuKeyStore = create<Store>()((set) => ({
  menuKey: '/',
  setMenuKey: (key: string) => set(() => ({ menuKey: key })),
}));
