import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface ThemeState {
    dark: boolean;
    accent: string;
    setDark: (v: boolean) => void;
    setAccent: (v: string) => void;
}

export const useThemeStore = create<ThemeState>()(
    persist(
        (set) => ({
            dark: true,
            accent: '#FF7F50',
            setDark: (v) => set({ dark: v }),
            setAccent: (v) => set({ accent: v }),
        }),
        { name: 'afiqakm-theme' },
    ),
);
