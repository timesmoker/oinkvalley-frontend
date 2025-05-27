//src/app/(default)/login/page.tsx
'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import {useAuthStore} from "@/store/useAuthStore";
import apiClient from '@/lib/api/apiClient'
import axios from "axios";

export default function LoginPage() {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState('')
    const router = useRouter()
    const { login } = useAuthStore();

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');

        try {
            await apiClient.post('/auth/login', { email, password });

            login();
            router.push('/');
        } catch (error) {
            if (axios.isAxiosError(error)) {
                setError(error.response?.data?.error || '로그인 실패');
            } else {
                setError('알 수 없는 오류가 발생했습니다.');
            }
        }
    };


    return (
        <div className="max-w-md mx-auto mt-20 p-6 border rounded shadow bg-white">
            <h2 className="text-2xl font-bold mb-6 text-center">로그인</h2>

            <form onSubmit={handleLogin} className="space-y-4">
                <div>
                    <label className="block text-sm font-medium">이메일</label>
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        className="w-full px-3 py-2 border rounded"
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium">비밀번호</label>
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        className="w-full px-3 py-2 border rounded"
                    />
                </div>

                {error && <p className="text-red-500 text-sm">{error}</p>}

                <button
                    type="submit"
                    className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
                >
                    로그인
                </button>
            </form>
        </div>
    )
}
