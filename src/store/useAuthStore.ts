// src/store/useAuthStore.ts
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

type AuthStore = {
    isLoggedIn: boolean;
    login: () => void;
    logout: () => void;
    hasHydrated: boolean;
    setHasHydrated: (value: boolean) => void;
};

export const useAuthStore = create<AuthStore>()(
    persist(
        (set) => ({
            isLoggedIn: false,
            login: () => {
                set({ isLoggedIn: true });
            },
            logout: () => {
                set({ isLoggedIn: false });
            },
            hasHydrated: false,
            setHasHydrated: (value) => set({ hasHydrated: value }),
        }),
        {
            name: 'auth-storage',
            onRehydrateStorage: () => (state) => {
                state?.setHasHydrated(true);
            },
        }
    )
);
