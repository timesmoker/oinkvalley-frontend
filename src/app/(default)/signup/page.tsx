'use client'

import { useState } from 'react'

export default function SignUpForm() {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState('')
    const [success, setSuccess] = useState('')

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setError('')
        setSuccess('')

        try {
            const res = await fetch('/api/auth/signup', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    email,
                    passwordHash: password,
                }),
            })

            if (!res.ok) throw new Error('회원가입 실패')

            setSuccess('🎉 회원가입이 완료되었습니다.')
            setEmail('')
            setPassword('')
        } catch (err) {
            console.error('❌ 에러:', err)
            setError('회원가입에 실패했습니다.')
        }
    }

    return (
        <div className="max-w-md mx-auto mt-20 p-6 border rounded shadow bg-white">
            <h2 className="text-2xl font-bold mb-6 text-center">회원가입</h2>

            <form onSubmit={handleSubmit} className="space-y-4">
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
                {success && <p className="text-green-600 text-sm">{success}</p>}

                <button
                    type="submit"
                    className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
                >
                    가입하기
                </button>
            </form>
        </div>
    )
}
