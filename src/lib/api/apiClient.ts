// src/lib/api/apiClient.ts
import axios from 'axios';

const apiClient = axios.create({
    baseURL: '/api',
    withCredentials: true,
    headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
    },
});

export default apiClient;
