import DrawerButton from '@/components/DrawerButton';
import {colors} from '@/constants/colors';
import React, {useState} from 'react';
import {Alert, StyleSheet, View} from 'react-native';
import MapView, {LatLng, Marker, PROVIDER_GOOGLE} from 'react-native-maps';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import useUserLocation from '@/hooks/useUserLocation';
import {numbers} from '@/constants/numbers';
import usePermission from '@/hooks/usePermission';
import Toast from 'react-native-toast-message';
import CustomMarker from '@/components/CustomMarker';
import useMoveMapView from '@/hooks/useMoveMapView';
import MapIconButton from '@/components/MapIconButton';
import {useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import {MapStackParamList} from '@/types/navigation';
import useGetMarkers from '@/hooks/useGetMarkers';

type Navigation = StackNavigationProp<MapStackParamList>;

function MapHomeScreen() {
  const navigation = useNavigation<Navigation>();
  const inset = useSafeAreaInsets();

  const {userLocation, isUserLocationError} = useUserLocation();
  const {mapRef, moveMapView, handleChangeDelta} = useMoveMapView();
  const [selectedLocation, setSelectedLocation] = useState<LatLng | null>(null);
  const {data: markers = []} = useGetMarkers();

  usePermission('LOCATION');

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

  const handlePressMarker = (coordinate: LatLng) => {
    moveMapView(coordinate);
  };

  const handlePressAddPost = () => {
    if (!selectedLocation) {
      Alert.alert(
        '추가할 위치를 선택해주세요.',
        '지도를 길게 누르면 위치가 선택됩니다.',
      );
      return;
    }
    navigation.navigate('AddLocation', {
      location: selectedLocation,
    });
    setSelectedLocation(null);
  };

  return (
    <>
      <DrawerButton
        style={[styles.drawerButton, {top: inset.top + 10}]}
        color={colors.WHITE}
      />
      <MapView
        ref={mapRef} // MapView를 제어하기 위한 참조. animateToRegion 같은 메서드를 호출할 때 사용
        style={styles.container}
        region={{
          // 지도에 표시될 영역(카메라 위치)을 설정
          ...userLocation, // 사용자의 현재 위치 (latitude, longitude)
          ...numbers.INITIAL_DELTA, // 지도의 확대/축소 정도 (latitudeDelta, longitudeDelta)
        }}
        provider={PROVIDER_GOOGLE}
        onLongPress={({nativeEvent}) => {
          setSelectedLocation(nativeEvent.coordinate); // 길게 누른 위치의 좌표를 저장하여 마커 표시
        }}
        onRegionChangeComplete={handleChangeDelta}>
        {markers.map(({id, color, score, ...coordinate}) => (
          <CustomMarker
            key={id}
            color={color}
            score={score}
            coordinate={coordinate}
            onPress={() => handlePressMarker(coordinate)}
          />
        ))}
        {selectedLocation && <Marker coordinate={selectedLocation} />}
      </MapView>
      <View style={styles.buttonList}>
        <MapIconButton name="plus" onPress={handlePressAddPost} />
        <MapIconButton
          name="location-crosshairs"
          onPress={hanldePressUserLocation}
        />
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
