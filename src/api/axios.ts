import axios from 'axios';
import {Platform} from 'react-native';

export const baseUrls = {
  android: 'https://remembrall-server.onrender.com',
  ios: 'https://remembrall-server.onrender.com',
};

const axiosInstance = axios.create({
  baseURL: Platform.OS === 'android' ? baseUrls.android : baseUrls.ios,
});

export default axiosInstance;