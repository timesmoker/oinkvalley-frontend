// src/store/useAuthStore.ts
import { create } from 'zustand'
import apiClient from "@/lib/api/apiClient";

type AuthStore = {
    isLoggedIn: boolean;
    user: { id: number; email: string; roles: string[] } | null;
    token: string | null;
    login: (token: string, user: AuthStore['user']) => void;
    logout: () => void;
}

export const useAuthStore = create<AuthStore>((set) => ({
    isLoggedIn: false,
    user: null,
    token: null,
    login: (token, user) => {
        set({ isLoggedIn: true, token, user })
        localStorage.setItem('token', token)
    },
    logout() {
        localStorage.removeItem('token')
        delete apiClient.defaults.headers.common['Authorization']
        set({ token: null, user: null })
    }

}))
