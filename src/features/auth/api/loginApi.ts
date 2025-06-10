import apiClient from '@/lib/api/apiClient';

export async function loginApi(email: string, password: string) {
    return apiClient.post('/auth/login', { email, password });
}
