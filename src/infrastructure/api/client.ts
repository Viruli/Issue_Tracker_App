import axios from 'axios';

export const apiClient = axios.create({
    baseURL: 'BACKEND_URL',
    timeout: 5000,
    headers: {
        'Content-Type': 'application/json'
    }
})