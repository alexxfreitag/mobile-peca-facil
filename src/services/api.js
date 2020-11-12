/* eslint-disable no-param-reassign */
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';

const api = axios.create({
  baseURL: 'http://10.0.0.175:3333/api',
});

api.interceptors.request.use(async (config) => {
  const [tokenArray] = await AsyncStorage.multiGet([
    '@PecaFacil:token',
    '@PecaFacil:user',
  ]);
  const token = tokenArray[1];
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;
