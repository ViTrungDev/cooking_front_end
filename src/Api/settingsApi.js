// src/Api/settingsApi.js
import axiosClient from './axiosClient';

const settingsApi = {
  getUserProfile: () => axiosClient.get('/user/profile'),
  updateUserProfile: (data) => axiosClient.put('/user/profile', data),
  changePassword: (data) => axiosClient.post('/user/change-password', data),
  updatePreferences: (data) => axiosClient.put('/user/preferences', data),
};

export default settingsApi;
