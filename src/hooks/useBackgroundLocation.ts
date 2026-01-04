import {useEffect, useRef, useCallback} from 'react';
import BackgroundJob from 'react-native-background-actions';
import Geolocation, {GeoPosition} from 'react-native-geolocation-service';
import {getToken, getMessaging} from '@react-native-firebase/messaging';
import {getApp} from '@react-native-firebase/app';
import {
  backgroundNotificationOption,
  watchPosition,
  requestLocationPermissions,
} from '@/utils/backgroundLocation';
import {updateNearbyLocation} from '@/api/post';

function useBackgroundLocation() {
  const watchId = useRef<number | null>(null);

  const sendLocationToServer = useCallback(async (position: GeoPosition) => {
    try {
      const app = getApp();
      const messagingInstance = getMessaging(app);
      const fcmToken = await getToken(messagingInstance);

      if (!fcmToken) {
        console.log('FCM 토큰 없음');
        return;
      }

      await updateNearbyLocation({
        latitude: position.coords.latitude,
        longitude: position.coords.longitude,
        fcmToken,
      });

      console.log('위치 서버 전송 완료:', position.coords);
    } catch (error) {
      console.error('위치 전송 실패:', error);
    }
  }, []);

  const startBackgroundTracking = useCallback(async () => {
    const hasPermission = await requestLocationPermissions();
    if (!hasPermission) {
      console.log('위치 권한이 거부되었습니다.');
      return false;
    }

    if (BackgroundJob.isRunning()) {
      console.log('백그라운드 작업이 이미 실행 중입니다.');
      return true;
    }

    try {
      await BackgroundJob.start(async () => {
        console.log('백그라운드 위치 추적 시작');
        await new Promise<void>(() => {
          watchId.current = watchPosition(
            position => {
              console.log('위치 업데이트:', position.coords);
              sendLocationToServer(position);
            },
            error => {
              console.log('위치 오류:', error);
            },
          );
        });
      }, backgroundNotificationOption);
      return true;
    } catch (error) {
      console.error('백그라운드 작업 시작 오류:', error);
      return false;
    }
  }, [sendLocationToServer]);

  const stopBackgroundTracking = useCallback(async () => {
    try {
      if (BackgroundJob.isRunning()) {
        await BackgroundJob.stop();
      }
      if (watchId.current !== null) {
        Geolocation.clearWatch(watchId.current);
        watchId.current = null;
      }
      console.log('백그라운드 위치 추적 중지');
    } catch (error) {
      console.error('백그라운드 작업 중지 오류:', error);
    }
  }, []);

  useEffect(() => {
    BackgroundJob.on('expiration', () => {
      console.log('iOS: 백그라운드 서비스 만료');
    });

    return () => {
      stopBackgroundTracking();
    };
  }, [stopBackgroundTracking]);

  return {
    startBackgroundTracking,
    stopBackgroundTracking,
  };
}

export default useBackgroundLocation;