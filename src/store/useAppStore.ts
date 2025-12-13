import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface User {
  id: string;
  name: string;
  email: string;
}

interface AppState {
  theme: 'light' | 'dark';
  user: User | null;
  isAuthenticated: boolean;
  setTheme: (theme: 'light' | 'dark') => void;
  setUser: (user: User | null) => void;
  logout: () => void;
}

export const useAppStore = create<AppState>()(
  persist(
    (set) => ({
      theme: 'light',
      user: null,
      isAuthenticated: false,
      setTheme: (theme) => set({ theme }),
      setUser: (user) => set({ user, isAuthenticated: !!user }),
      logout: () => set({ user: null, isAuthenticated: false }),
    }),
    {
      name: 'krasiot-storage',
    }
  )
);
