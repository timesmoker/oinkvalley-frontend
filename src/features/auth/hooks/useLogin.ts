import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuthStore } from '@/features/auth/store/useAuthStore';
import { loginApi } from '@/features/auth/api/loginApi';
import axios from 'axios';

export function useLogin() {
    const { login } = useAuthStore();
    const router = useRouter();
    const [error, setError] = useState('');

    const handleLogin = async (email: string, password: string) => {
        setError('');
        try {
            await loginApi(email, password);
            login();
            router.push('/');
        } catch (err) {
            if (axios.isAxiosError(err)) {
                setError(err.response?.data?.error || '로그인 실패');
            } else {
                setError('알 수 없는 오류가 발생했습니다.');
            }
        }
    };

    return { handleLogin, error };
}
