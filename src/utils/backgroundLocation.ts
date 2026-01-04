import Geolocation, {GeoPosition, GeoError} from 'react-native-geolocation-service';
import {Platform, PermissionsAndroid} from 'react-native';

// 백그라운드 알림 옵션
export const backgroundNotificationOption = {
  taskName: '위치 추적',
  taskTitle: '근처 메모 알림',
  taskDesc: '주변 메모를 찾기 위해 위치를 추적하고 있습니다.',
  taskIcon: {
    name: 'ic_launcher',
    type: 'mipmap',
  },
  linkingURI: 'remembrall',
  parameters: {
    delay: 5000,
  },
};

// 위치 권한 요청
export const requestLocationPermissions = async (): Promise<boolean> => {
  if (Platform.OS === 'ios') {
    const status = await Geolocation.requestAuthorization('always');
    return status === 'granted';
  }

  if (Platform.OS === 'android') {
    const fineLocation = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
    );

    if (fineLocation === PermissionsAndroid.RESULTS.GRANTED) {
      const backgroundLocation = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_BACKGROUND_LOCATION,
      );
      return backgroundLocation === PermissionsAndroid.RESULTS.GRANTED;
    }
    return false;
  }
  return false;
};

// 위치 감시 함수
export const watchPosition = (
  onSuccess: (position: GeoPosition) => void,
  onError: (error: GeoError) => void,
): number => {
  return Geolocation.watchPosition(onSuccess, onError, {
    accuracy: {
      android: 'high',
      ios: 'best',
    },
    enableHighAccuracy: true,
    distanceFilter: 50,
    interval: 5000,
    fastestInterval: 2000,
    showLocationDialog: true,
    forceRequestLocation: true,
    showsBackgroundLocationIndicator: true,
  });
};