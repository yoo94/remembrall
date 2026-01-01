import {create} from 'zustand';
import {LatLng} from 'react-native-maps';

interface LocationState {
  moveLocation: LatLng | null;
  selectLocation: LatLng | null;
  selectedMarkerId: number | null;
  setMoveLocation: (location: LatLng | null) => void;
  setSelectLocation: (location: LatLng | null) => void;
  setSelectedMarkerId: (id: number | null) => void;
}

const useLocationStore = create<LocationState>(set => ({
  moveLocation: null,
  selectLocation: null,
  selectedMarkerId: null,
  setMoveLocation: (moveLocation: LatLng | null) => {
    set(state => ({...state, moveLocation}));
  },
  setSelectLocation: (selectLocation: LatLng | null) => {
    set(state => ({...state, selectLocation}));
  },
  setSelectedMarkerId: (selectedMarkerId: number | null) => {
    set(state => ({...state, selectedMarkerId}));
  },
}));

export default useLocationStore;