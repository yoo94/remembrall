import {useEffect, useMemo} from 'react';
import PushNotification from 'react-native-push-notification';
import useUserLocation from '@/hooks/useUserLocation';
import useGetMarkers from '@/hooks/queries/useGetMarkers';
import {Marker} from '@/types/domain';

// 거리 계산 함수 (하버사인 공식)
function getDistance(lat1: number, lon1: number, lat2: number, lon2: number) {
  const R = 6371000; // 지구 반지름(m)
  const toRad = (v: number) => (v * Math.PI) / 180;
  const dLat = toRad(lat2 - lat1);
  const dLon = toRad(lon2 - lon1);
  const a =
    Math.sin(dLat / 2) ** 2 +
    Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) * Math.sin(dLon / 2) ** 2;
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
}

function useProximityAlarm() {
  const {userLocation} = useUserLocation();
  const {data} = useGetMarkers();

  // useMemo로 markers와 notifiedPostIds를 의존성 배열에서 안정화
  const {markers, notifiedPostIds} = useMemo(
    () => ({
      markers: data?.markers || [],
      notifiedPostIds: data?.notifiedPostIds || [],
    }),
    [data?.markers, data?.notifiedPostIds],
  );

  useEffect(() => {
    if (!userLocation || markers.length === 0) return;

    // 백엔드에서 받은 notifiedPostIds 사용
    const candidates: Array<Marker & {distance: number}> = markers
      .filter(
        (marker: Marker) =>
          marker.meter &&
          marker.title &&
          !notifiedPostIds.includes(String(marker.id)) &&
          getDistance(
            userLocation.latitude,
            userLocation.longitude,
            marker.latitude,
            marker.longitude,
          ) <= Number(marker.meter),
      )
      .map((marker: Marker) => ({
        ...marker,
        title: marker.title,
        distance: getDistance(
          userLocation.latitude,
          userLocation.longitude,
          marker.latitude,
          marker.longitude,
        ),
      }));

    if (candidates.length === 0) return;

    const nearest = candidates.reduce((a, b) =>
      a.distance < b.distance ? a : b,
    );

    PushNotification.localNotification({
      channelId: 'default-channel-id',
      title: '근처에 메모발견!!',
      message: `지정거리내에 ${nearest.title} 메모가 있어요!`,
      playSound: true,
      soundName: 'default',
      userInteraction: false,
      userInfo: {markerId: String(nearest.id)},
      data: {markerId: String(nearest.id)},
      id: String(nearest.id),
    });
  }, [userLocation, markers, notifiedPostIds]);
}

export default useProximityAlarm;
