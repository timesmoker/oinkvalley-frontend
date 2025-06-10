import apiClient from '@/lib/api/apiClient';

export async function logoutApi() {
    return apiClient.post('/auth/logout');
}