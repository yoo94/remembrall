import {LatLng} from 'react-native-maps';

declare module 'react-native-maps' {
  export interface MyMapMarkerProps {
    coordinate?: LatLng;
  }
}
