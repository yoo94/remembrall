import {MarkerResponse} from '@/types/domain';
import axiosInstance from './axios';

async function getMarkers(): Promise<MarkerResponse> {
  const {data} = await axiosInstance.get('/markers');
  return data;
}

export {getMarkers};
