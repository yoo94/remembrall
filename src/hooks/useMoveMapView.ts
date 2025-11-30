import {numbers} from '@/constants';
import {useRef, useState} from 'react';
import MapView, {LatLng, Region} from 'react-native-maps';

type Delta = Pick<Region, 'latitudeDelta' | 'longitudeDelta'>;

function useMoveMapView() {
  //지도 ref
  const mapRef = useRef<MapView | null>(null);
  const [regionDelta, setRegionDelta] = useState<Delta>(numbers.INITIAL_DELTA); // 지도 확대 정도 저장 상태

  //지도 이동 함수
  const moveMapView = (coordinate: LatLng, delta?: Delta) => {
    if (mapRef.current) {
      mapRef.current.animateToRegion({
        ...coordinate,
        ...(delta ?? regionDelta),
      });
    }
  };

  const handleChangeDelta = (region: Region) => {
    const {latitudeDelta, longitudeDelta} = region;
    setRegionDelta({latitudeDelta, longitudeDelta});
  };

  return {mapRef, moveMapView, handleChangeDelta};
}

export default useMoveMapView;
