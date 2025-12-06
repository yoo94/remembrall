import {numbers} from '@/constants';
import {useRef, useState, useEffect, useCallback} from 'react';
import MapView, {LatLng, Region} from 'react-native-maps';
import useLocationStore from '@/store/location';

type Delta = Pick<Region, 'latitudeDelta' | 'longitudeDelta'>;

function useMoveMapView() {
  const mapRef = useRef<MapView | null>(null);
  const [regionDelta, setRegionDelta] = useState<Delta>(numbers.INITIAL_DELTA);
  const {moveLocation} = useLocationStore();

  const moveMapView = useCallback(
    (coordinate: LatLng, delta?: Delta) => {
      if (mapRef.current) {
        mapRef.current.animateToRegion({
          ...coordinate,
          ...(delta ?? regionDelta),
        });
      }
    },
    [regionDelta],
  );

  const handleChangeDelta = useCallback((region: Region) => {
    const {latitudeDelta, longitudeDelta} = region;
    setRegionDelta({latitudeDelta, longitudeDelta});
  }, []);

  useEffect(() => {
    if (moveLocation) {
      moveMapView(moveLocation);
    }
  }, [moveLocation, moveMapView]);

  return {mapRef, moveMapView, handleChangeDelta};
}

export default useMoveMapView;