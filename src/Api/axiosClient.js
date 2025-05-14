import axios from 'axios';
import Cookies from 'js-cookie';

const axiosClient = axios.create({
    baseURL: 'https://localhost:7187/api',
    headers: {
        'Content-Type': 'application/json',
    },
    timeout: 10000,
});

// Gắn token vào request
axiosClient.interceptors.request.use(
    (config) => {
        const token = sessionStorage.getItem('accessToken');
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => Promise.reject(error),
);

// Bắt lỗi 401 trong response
axiosClient.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response && error.response.status === 401) {
            // Xóa dữ liệu đăng nhập
            localStorage.removeItem('currentUser');
            localStorage.removeItem('cartItems');
            localStorage.removeItem('isAdmin');
            sessionStorage.removeItem('accessToken');
            Cookies.remove('refreshToken');

            // Chuyển về trang đăng nhập
            window.location.href = '/login';
        }
        return Promise.reject(error);
    },
);

export default axiosClient;
