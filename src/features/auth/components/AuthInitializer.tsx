'use client';

import { useEffect } from 'react';
import { useAuthStore } from '@/features/auth/store/useAuthStore';
import apiClient from '@/lib/api/apiClient';

export default function AuthInitializer() {
    const { login, logout, setHasHydrated } = useAuthStore();

    console.log("AuthInitializer Loaded");
    useEffect(() => {

        apiClient.get('/auth/me')
            .then(() => login())
            .catch(() => logout())
            .finally(() => setHasHydrated(true));
    }, [login, logout, setHasHydrated]);


    return null;
}
