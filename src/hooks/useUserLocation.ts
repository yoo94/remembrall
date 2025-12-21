import {useEffect, useState} from 'react';
import {LatLng} from 'react-native-maps';
import Geolocation from '@react-native-community/geolocation';
import useAppState from './useAppState';

function useUserLocation() {
  const [userLocation, setUserLocation] = useState<LatLng>({
    latitude: 37.5516032365118,
    longitude: 126.98989626020192,
  });
  const [isUserLocationError, setIsUserLocationError] = useState(false);
  const {isComeback} = useAppState();

  // 처음 마운트될 때 위치 가져오기
  useEffect(() => {
    Geolocation.getCurrentPosition(
      info => {
        setUserLocation(info.coords);
        setIsUserLocationError(false);
      },
      () => {
        setIsUserLocationError(true);
      },
      {
        enableHighAccuracy: true,
      },
    );
  }, []); // 빈 배열로 처음 한 번만 실행

  // 앱이 백그라운드에서 돌아올 때 위치 업데이트
  useEffect(() => {
    if (!isComeback) return;

    Geolocation.getCurrentPosition(
      info => {
        setUserLocation(info.coords);
        setIsUserLocationError(false);
      },
      () => {
        setIsUserLocationError(true);
      },
      {
        enableHighAccuracy: true,
      },
    );
  }, [isComeback]);

  return {userLocation, isUserLocationError};
}

export default useUserLocation;