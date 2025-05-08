// src/store/useAuthStore.ts
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

type AuthStore = {
    isLoggedIn: boolean;
    user: { id: number; email: string; roles: string[] } | null;
    token: string | null;
    login: (token: string, user: AuthStore['user']) => void;
    logout: () => void;
    hasHydrated: boolean;
    setHasHydrated: (value: boolean) => void;
};

export const useAuthStore = create<AuthStore>()(
    persist(
        (set) => ({
            isLoggedIn: false,
            user: null,
            token: null,
            login: (token, user) => {
                set({ isLoggedIn: true, token, user });
            },
            logout: () => {
                set({ isLoggedIn: false, token: null, user: null });
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
