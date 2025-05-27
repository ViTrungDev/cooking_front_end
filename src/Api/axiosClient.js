import axios from 'axios';
import Cookies from 'js-cookie';

const axiosClient = axios.create({
    baseURL: 'https://localhost:7187/api',
    headers: {
        'Content-Type': 'application/json',
    },
    timeout: 10000,
});

// Flag để tránh gọi refresh nhiều lần nếu có nhiều request lỗi cùng lúc
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

// Gắn accessToken vào request
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

// Xử lý response
axiosClient.interceptors.response.use(
    (response) => response,
    async (error) => {
        const originalRequest = error.config;

        if (error.response?.status === 401 && !originalRequest._retry) {
            if (isRefreshing) {
                // Nếu đang refresh, push request này vào hàng đợi
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
                const response = await axios.post(
                    'https://localhost:7187/api/authentication/refresh-token',
                    {},
                    { withCredentials: true }, // Phải gửi cookie
                );

                const newAccessToken = response.data.accessToken;
                sessionStorage.setItem('accessToken', newAccessToken);

                axiosClient.defaults.headers.Authorization = `Bearer ${newAccessToken}`;
                processQueue(null, newAccessToken);

                return axiosClient(originalRequest);
            } catch (err) {
                processQueue(err, null);
                // Nếu refresh fail => logout
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
