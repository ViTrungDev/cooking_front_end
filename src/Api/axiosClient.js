import axios from 'axios';
import Cookies from 'js-cookie';

// Tạo instance chính cho các request bình thường
const axiosClient = axios.create({
    baseURL: 'https://localhost:7187/api',
    headers: {
        'Content-Type': 'application/json',
    },
    timeout: 10000,
});

// Tạo instance riêng để gọi refresh token (bỏ qua interceptor)
const axiosRefresh = axios.create({
    baseURL: 'https://localhost:7187/api',
    headers: {
        'Content-Type': 'application/json',
    },
});

let isRefreshing = false;
let failedQueue = [];

const processQueue = (error, token = null) => {
    failedQueue.forEach((prom) => {
        if (error) {
            prom.reject(error);
        } else {
            prom.resolve(token);
        }
    });
    failedQueue = [];
};

// Gắn accessToken vào mỗi request
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

// Xử lý response lỗi 401 và tự động refresh token
axiosClient.interceptors.response.use(
    (response) => response,
    async (error) => {
        const originalRequest = error.config;

        if (error.response?.status === 401 && !originalRequest._retry) {
            if (isRefreshing) {
                // Chờ token mới
                return new Promise((resolve, reject) => {
                    failedQueue.push({ resolve, reject });
                })
                    .then((token) => {
                        originalRequest.headers.Authorization = `Bearer ${token}`;
                        return axiosClient(originalRequest);
                    })
                    .catch((err) => Promise.reject(err));
            }

            originalRequest._retry = true;
            isRefreshing = true;

            try {
                const response = await axiosRefresh.post(
                    '/authentication/refresh-token',
                );

                const newAccessToken = response.data.accessToken;
                sessionStorage.setItem('accessToken', newAccessToken);

                processQueue(null, newAccessToken);

                // Gắn token mới cho request ban đầu
                originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
                return axiosClient(originalRequest);
            } catch (err) {
                processQueue(err, null);
                localStorage.clear();
                sessionStorage.clear();
                Cookies.remove('refreshToken');
                window.location.href = '/login';
                return Promise.reject(err);
            } finally {
                isRefreshing = false;
            }
        }

        return Promise.reject(error);
    },
);

export default axiosClient;
