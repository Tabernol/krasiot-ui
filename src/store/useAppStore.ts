import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface User {
  user_uid: string;
  email: string;
  firstname?: string;
  lastname?: string;
  role: string;
}

interface AuthTokens {
  accessToken: string;
  refreshToken: string;
  expiresIn: number;
}

interface AppState {
  theme: 'light' | 'dark';
  user: User | null;
  tokens: AuthTokens | null;
  isAuthenticated: boolean;
  setTheme: (theme: 'light' | 'dark') => void;
  setUser: (user: User | null) => void;
  setTokens: (tokens: AuthTokens | null) => void;
  login: (user: User, tokens: AuthTokens) => void;
  logout: () => void;
}

export const useAppStore = create<AppState>()(
  persist(
    (set) => ({
      theme: 'light',
      user: null,
      tokens: null,
      isAuthenticated: false,
      setTheme: (theme) => set({ theme }),
      setUser: (user) => set({ user, isAuthenticated: !!user }),
      setTokens: (tokens) => set({ tokens }),
      login: (user, tokens) => set({ user, tokens, isAuthenticated: true }),
      logout: () => set({ user: null, tokens: null, isAuthenticated: false }),
    }),
    {
      name: 'krasiot-storage',
      partialize: (state) => ({
        theme: state.theme,
        user: state.user,
        tokens: state.tokens,
        isAuthenticated: state.isAuthenticated,
      }),
    }
  )
);
