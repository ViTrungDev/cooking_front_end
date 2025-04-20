import axiosClient from '~/Api/axiosClient';

const authApi = {
    register: (data) => {
        return axiosClient.post('/authentication/register', data);
    },
    login: (data) => {
        return axiosClient.post('/login', data);
    },
};
export default authApi;
