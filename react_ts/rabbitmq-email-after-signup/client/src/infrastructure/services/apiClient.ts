import axios, { type AxiosResponse } from 'axios';

const getAuthToken = (): string | null => {
    return localStorage.getItem('authToken');
}

const baseURL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:4000/api';

const apiClient = axios.create({
    baseURL: baseURL,
    headers: {
        'Content-Type': 'application/json',
    },
});

apiClient.interceptors.request.use(
    (config) => {
        const token = getAuthToken();
        if (token) {
            config.headers['Authorization'] = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

apiClient.interceptors.response.use(
    (response: AxiosResponse): AxiosResponse => {
        return response;
    },
    (error) => {
        if (error.response && error.response.status === 401) {
            console.error('UNAUTHORIZED, LOGGING OUT...');
            localStorage.removeItem('authToken');

            window.location.href = '/login';
        }
        return Promise.reject(error);
    }
);

export default apiClient;