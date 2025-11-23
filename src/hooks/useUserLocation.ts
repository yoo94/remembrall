import Geolocation from '@react-native-community/geolocation';
import {useEffect, useState} from 'react';
import {LatLng} from 'react-native-maps';
import useAppState from './useAppState';

function useUserLocation() {
  //내위치
  const [userLocation, setUserLocation] = useState<LatLng>({
    latitude: 37.5516032365118,
    longitude: 126.98989626020192,
  });
  //내위치 받아왓는지
  const [isUserLocationError, setIsUserLocationError] =
    useState<boolean>(false);

  const {isComeback} = useAppState();

  useEffect(() => {
    if (!isComeback) return;
    Geolocation.getCurrentPosition(
      position => {
        setUserLocation(position.coords);
      },
      () => {
        setIsUserLocationError(true);
      },
      {enableHighAccuracy: true, timeout: 15000},
    );
  }, [isComeback]);

  return {userLocation, isUserLocationError};
}

export default useUserLocation;
