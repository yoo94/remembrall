import {axiosInstance} from './axios';
import type {Marker} from '@/types';

const getMarkers = async (): Promise<Marker[]> => {
  const {data} = await axiosInstance.get('/markers');

  return data;
};

export {getMarkers};