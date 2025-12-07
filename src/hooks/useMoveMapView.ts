import {useEffect, useRef, useState, useCallback} from 'react';
import MapView, {LatLng, Region} from 'react-native-maps';
import {numbers} from '@/constants/numbers';
import useLocationStore from '@/store/location';

type Delta = Pick<Region, 'latitudeDelta' | 'longitudeDelta'>;

function useMoveMapView() {
  const mapRef = useRef<MapView | null>(null);
  const [regionDelta, setRegionDelta] = useState<Delta>(numbers.INITIAL_DELTA);
  const {moveLocation} = useLocationStore();

  const moveMapView = useCallback(
    (coordinate: LatLng, delta?: Delta) => {
      mapRef.current?.animateToRegion({
        ...coordinate,
        ...(delta ?? regionDelta),
      });
    },
    [regionDelta],
  );

  const handleChangeDelta = (region: Region) => {
    const {latitudeDelta, longitudeDelta} = region;
    setRegionDelta({latitudeDelta, longitudeDelta});
  };

  useEffect(() => {
    moveLocation && moveMapView(moveLocation);
  }, [moveLocation, moveMapView]);

  return {mapRef, moveMapView, handleChangeDelta};
}

export default useMoveMapView;
