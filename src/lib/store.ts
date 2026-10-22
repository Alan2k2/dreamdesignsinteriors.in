import { create } from 'zustand';

interface AppState {
  menuOpen: boolean;
  setMenuOpen: (open: boolean) => void;
  // We can add more global states here later
}

export const useAppStore = create<AppState>((set) => ({
  menuOpen: false,
  setMenuOpen: (open) => set({ menuOpen: open }),
}));
