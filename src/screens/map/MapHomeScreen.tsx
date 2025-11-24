import DrawerButton from '@/components/DrawerButton';
import {colors} from '@/constants/colors';
import React, {useRef} from 'react';
import {Pressable, StyleSheet, View} from 'react-native';
import MapView, {LatLng, PROVIDER_GOOGLE} from 'react-native-maps';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import FontAwesome6 from '@react-native-vector-icons/fontawesome6';
import useUserLocation from '@/hooks/useUserLocation';
import {numbers} from '@/constants/numbers';
import usePermission from '@/hooks/usePermission';
import Toast from 'react-native-toast-message';

interface MapHomeScreenProps {}

function MapHomeScreen({}: MapHomeScreenProps) {
  const {userLocation, isUserLocationError} = useUserLocation();
  const inset = useSafeAreaInsets();
  //지도 ref
  const mapRef = useRef<MapView | null>(null);

  usePermission('LOCATION');

  //지도 이동 함수
  const moveMapView = (position: LatLng) => {
    if (mapRef.current) {
      mapRef.current.animateToRegion({
        ...position,
        latitudeDelta: numbers.INITIAL_DELTA.latitudeDelta,
        longitudeDelta: numbers.INITIAL_DELTA.longitudeDelta,
      });
    }
  };

  const hanldePressUserLocation = () => {
    if (isUserLocationError) {
      Toast.show({
        type: 'error',
        text1: '위치 정보를 가져올 수 없습니다.',
        text2: '위치 권한이 허용되었는지 설정을 확인해주세요.',
      });
      return;
    }
    if (userLocation) {
      moveMapView(userLocation);
    }
  };

  return (
    <>
      <DrawerButton
        style={[styles.drawerButton, {top: inset.top + 10}]}
        color={colors.WHITE}
      />
      <MapView
        ref={mapRef}
        provider={PROVIDER_GOOGLE}
        style={styles.container}
        region={{
          ...userLocation,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
      />
      <View style={styles.buttonList}>
        <Pressable style={styles.mapButton} onPress={hanldePressUserLocation}>
          <FontAwesome6
            iconStyle="solid"
            size={24}
            name="location-crosshairs"
            color={colors.WHITE}
          />
        </Pressable>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  drawerButton: {
    position: 'absolute',
    top: 10,
    left: 10,
    zIndex: 1,
    paddingHorizontal: 12,
    paddingVertical: 6,
    backgroundColor: colors.PINK_700,
    borderTopRightRadius: 50,
    borderBottomRightRadius: 50,
    boxShadow: '1px 1px 3px rgba(0, 0, 0, 0.5)',
  },
  buttonList: {
    position: 'absolute',
    bottom: 30,
    right: 20,
    zIndex: 1,
  },
  mapButton: {
    backgroundColor: colors.PINK_700,
    marginVertical: 5,
    height: 45,
    width: 45,
    borderRadius: 45,
    alignItems: 'center',
    justifyContent: 'center',
    boxShadow: '1px 1px 3px rgba(0, 0, 0, 0.5)',
  },
});

export default MapHomeScreen;
