// ~/Api/config.js

const BASE_URL =
    process.env.NODE_ENV === 'production'
        ? 'https://yourdomain.com' // Khi build production
        : 'https://localhost:7187'; // Khi chạy local

export default BASE_URL;
