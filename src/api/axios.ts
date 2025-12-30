import axios from 'axios';
import Config from 'react-native-config';
import {Platform} from 'react-native';

export const baseUrls = {
  android: Config.REST_API_BASE_URL || 'http://10.0.2.2:3030',
  ios: Config.REST_API_BASE_URL || 'http://localhost:3030',
};

const axiosInstance = axios.create({
  baseURL: Platform.OS === 'android' ? baseUrls.android : baseUrls.ios,
});

export default axiosInstance;