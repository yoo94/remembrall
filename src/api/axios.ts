import axios from 'axios';
import Config from 'react-native-config';

export const baseUrls = {
  android: Config.REST_API_BASE_URL,
  ios: Config.REST_API_BASE_URL,
};

const axiosInstance = axios.create({
  baseURL: Config.REST_API_BASE_URL,
});
export default axiosInstance;