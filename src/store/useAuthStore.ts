//src/store/useAuthStore.ts

import { create } from 'zustand'

type AuthStore = {
    isLoggedIn: boolean;
    user: { id: number; email: string; roles: string[] } | null;
    token: string | null;
    login: (token: string, user: AuthStore['user']) => void;
    logout: () => void;
};

export const useAuthStore = create<AuthStore>((set) => ({
    isLoggedIn: false,
    user: null,
    token: null,
    login: (token, user) => {
        localStorage.setItem('token', token);
        set({ isLoggedIn: true, token, user });
    },
    logout: () => {
        localStorage.removeItem('token');
        set({ isLoggedIn: false, token: null, user: null });
    },
}));
