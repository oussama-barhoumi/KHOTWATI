import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export const useAppStore = create(
  persist(
    (set) => ({
      theme: 'light',
      user: null,
      suggestedUsersVisible: true,
      setSuggestedUsersVisible: (visible) => set({ suggestedUsersVisible: visible }),
      toggleTheme: () =>
        set((state) => {
          const newTheme = state.theme === 'light' ? 'dark' : 'light';
          document.documentElement.classList.toggle('dark', newTheme === 'dark');
          return { theme: newTheme };
        }),
      setUser: (user) => set({ user }),
      logout: () => set({ user: null }),
    }),
    { name: 'khotwa-store', partialize: (state) => ({ theme: state.theme, user: state.user, suggestedUsersVisible: state.suggestedUsersVisible }) }
  )
);