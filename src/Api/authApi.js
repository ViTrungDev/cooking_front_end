import axiosClient from '~/Api/axiosClient';

const authApi = {
    register: (data) => {
        return axiosClient.post('/authentication/register', data);
    },
    login: (data) => {
        return axiosClient.post('/authentication/login', data);
    },
    refreshToken: (data) => {
        return axiosClient.post(
            '/api/authentication/refresh-token',
            {},
            { withCredentials: true },
        );
    },
    product: (data) => {
        return axiosClient.get('/product/getall', data);
    },
    createProduct: (data) => {
        return axiosClient.post('/product/create', data, {
            headers: {
                'Content-Type': undefined, // ⬅️ để Axios tự set multipart/form-data đúng chuẩn
            },
        });
    },
    putProduct: (productId, data) => {
        return axiosClient.put(`/product/update/${productId}`, data, {
            headers: {
                'Content-Type': undefined,
            },
        });
    },
    deleteProduct: (productId, data) => {
        return axiosClient.delete(`/product/delete/${productId}`, data);
    },
    getProductByID: (productId, data) => {
        return axiosClient.get(`/product/getbyid/${productId}`, data);
    },
    blog: (data) => {
        return axiosClient.get('/blog/getAll', data);
    },
    checkout: (data) => {
        return axiosClient.post('/order/create', data);
    },
    getAllOrder: (data) => {
        return axiosClient.get('/order/getALL', data);
    },
    shoppingbuy: (userId, data) => {
        return axiosClient.get(`/order/getAllbyID?user_id=${userId}`, data);
    },
    profile: (userId, data) => {
        return axiosClient.get(`/user/${userId}`, data);
    },
    getAllUser: (data) => {
        return axiosClient.get('/user/all', data);
    },
    updateProfile: (userId, data) => {
        return axiosClient.put(`/user/${userId}`, data);
    },
    deleteUser: (userId, data) => {
        return axiosClient.delete(`/user/${userId}`, data);
    },
};
export default authApi;
