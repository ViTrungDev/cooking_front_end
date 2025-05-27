import axiosClient from '~/Api/axiosClient';

const authApi = {
    register: (data) => {
        return axiosClient.post('/authentication/register', data);
    },
    login: (data) => {
        return axiosClient.post('/authentication/login', data);
    },
    product: (data) => {
        return axiosClient.get('/product/getall', data);
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
};
export default authApi;
