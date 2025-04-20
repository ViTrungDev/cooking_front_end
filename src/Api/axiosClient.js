import axios from 'axios';

const axiosClient = axios.create({
    baseURL: 'https://localhost:7187/api',
    headers: {
        'Content-Type': 'application/json',
    },
    timeout: 10000, // 10s
});
axiosClient.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('token');
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        Promise.reject(error);
    },
);
export default axiosClient;
