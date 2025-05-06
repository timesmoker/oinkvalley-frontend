'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'

export default function LoginPage() {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState('')
    const router = useRouter()

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault()
        setError('')

        try {
            const res = await fetch('/api/auth/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                },
                body: JSON.stringify({ email, password }),
            })

            const data = await res.json()

            if (!res.ok) {
                // 서버가 JSON 형태의 에러를 보내면 그걸로 메시지 띄움
                throw new Error(data.error || '로그인 실패')
            }

            localStorage.setItem('token', data.token)
            router.push('/')
        } catch (err: unknown) {
            console.error(err)

            if (err instanceof Error) {
                setError(err.message || '이메일 또는 비밀번호가 올바르지 않습니다.')
            } else {
                setError('알 수 없는 오류가 발생했습니다.')
            }
        }

    }


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
