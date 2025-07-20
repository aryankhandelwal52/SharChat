import {create} from 'zustand'

export const useThemeStore = create((set) => ({
  theme: localStorage.getItem("chat-theme")||"light", // Default theme
  setTheme: (theme) => {
    localStorage.setItem("chat-theme", theme);
    set({ theme });
  },
}));