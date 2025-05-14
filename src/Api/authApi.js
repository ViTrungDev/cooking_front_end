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
};
export default authApi;
