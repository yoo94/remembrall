import React, {useState, useEffect} from 'react';
import {Alert, StyleSheet, View} from 'react-native';
import MapView, {
  LatLng,
  Marker,
  PROVIDER_GOOGLE,
  Circle,
} from 'react-native-maps';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import Toast from 'react-native-toast-message';

import DrawerButton from '@/components/common/DrawerButton';
import CustomMarker from '@/components/common/CustomMarker';
import useUserLocation from '@/hooks/useUserLocation';
import usePermission from '@/hooks/usePermission';
import useMoveMapView from '@/hooks/useMoveMapView';
import {colors} from '@/constants/colors';
import {numbers} from '@/constants/numbers';
import MapIconButton from '@/components/map/MapIconButton';
import {useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import {MapStackParamList} from '@/types/navigation';
import useGetMarkers from '@/hooks/queries/useGetMarkers';
import MarkerModal from '@/components/map/MarkerModal';
import useModal from '@/hooks/useModal';
import useLocationStore from '@/store/location';
import MarkerFilterAction from '@/components/map/MarkerFilterAction';
import useFilterStore from '@/store/filter';
import useThemeStore, {Theme} from '@/store/theme';
import TutorialModal from '@/components/common/TutorialModal';
import useProximityAlarm from '@/hooks/useProximityAlarm';
import useBackgroundLocation from '@/hooks/useBackgroundLocation';

type Navigation = StackNavigationProp<MapStackParamList>;

function MapHomeScreen() {
  const {theme} = useThemeStore();
  const styles = styling(theme);
  const navigation = useNavigation<Navigation>();
  const inset = useSafeAreaInsets();
  const [markerId, setSetMarkerId] = useState<number>();
  const {
    selectLocation,
    setSelectLocation,
    selectedMarkerId,
    setSelectedMarkerId,
  } = useLocationStore();
  const {filters} = useFilterStore();
  const {userLocation, isUserLocationError} = useUserLocation();
  const {mapRef, moveMapView, handleChangeDelta} = useMoveMapView();
  const {data: markers = []} = useGetMarkers({
    select: data =>
      data.filter(
        marker =>
          (filters[marker.color] ?? true) &&
          (filters[String(marker.score)] ?? true),
      ),
  });
  const {startBackgroundTracking, stopBackgroundTracking} =
    useBackgroundLocation();
  const markerModal = useModal();
  const filterAction = useModal();
  const tutorial = useModal();
  usePermission('LOCATION');

  // 알림 클릭으로 선택된 마커가 있으면 해당 위치로 이동
  useEffect(() => {
    if (selectedMarkerId) {
      const targetMarker = markers.find(m => m.id === selectedMarkerId);
      if (targetMarker) {
        moveMapView({
          latitude: targetMarker.latitude,
          longitude: targetMarker.longitude,
        });
        setSetMarkerId(selectedMarkerId);
        markerModal.show();
      }
    }
  }, [selectedMarkerId, markers, moveMapView, markerModal]);
  useEffect(() => {
    // 앱 시작 시 백그라운드 추적 시작
    startBackgroundTracking();

    return () => {
      // 컴포넌트 언마운트 시 중지
      stopBackgroundTracking();
    };
  }, [startBackgroundTracking, stopBackgroundTracking]);

  const handlePressUserLocation = () => {
    if (isUserLocationError) {
      Toast.show({
        type: 'error',
        text1: '위치 권한을 허용해주세요.',
        position: 'bottom',
      });
      return;
    }

    moveMapView(userLocation);
  };

  const handlePressMarker = (id: number, coordinate: LatLng) => {
    setSetMarkerId(id);
    setSelectedMarkerId(id);
    moveMapView(coordinate);
    markerModal.show();
  };

  const handleHideModal = () => {
    markerModal.hide();
    setSelectedMarkerId(null);
  };

  const handlePressAddPost = () => {
    if (!selectLocation) {
      Alert.alert(
        '추가할 위치를 선택해주세요',
        '지도를 길게 누르면 위치가 선택됩니다.',
      );
      return;
    }

    navigation.navigate('AddLocation', {
      location: selectLocation,
    });
    setSelectLocation(null);
  };

  useProximityAlarm();

  return (
    <>
      <DrawerButton
        style={[styles.drawerButton, {top: inset.top + 10}]}
        color={colors[theme].WHITE}
      />
      <MapView
        userInterfaceStyle={theme}
        googleMapId="f397ec96980a97c3c96a731d"
        style={styles.container}
        ref={mapRef}
        region={{
          ...userLocation,
          ...numbers.INITIAL_DELTA,
        }}
        provider={PROVIDER_GOOGLE}
        showsUserLocation={true}
        followsUserLocation={false}
        showsMyLocationButton={false}
        onRegionChangeComplete={handleChangeDelta}
        onLongPress={({nativeEvent}) =>
          setSelectLocation(nativeEvent.coordinate)
        }>
        {markers.map(({id, color, score, ...coordinate}) => (
          <CustomMarker
            key={id}
            color={color}
            score={score}
            coordinate={coordinate}
            isSelected={selectedMarkerId === id}
            onPress={() => handlePressMarker(id, coordinate)}
          />
        ))}
        <Circle
          center={userLocation}
          radius={500}
          strokeColor="rgba(0,191,255,0.7)"
          fillColor="rgba(135,206,250,0.2)"
          zIndex={2}
        />
        {selectLocation && <Marker coordinate={selectLocation} />}
      </MapView>
      <View style={styles.buttonList}>
        <MapIconButton name="question" onPress={tutorial.show} />
        <MapIconButton
          name="magnifying-glass"
          onPress={() => navigation.navigate('SearchLocation')}
        />
        <MapIconButton name="filter" onPress={filterAction.show} />
        <MapIconButton name="plus" onPress={handlePressAddPost} />
        <MapIconButton
          name="location-crosshairs"
          onPress={handlePressUserLocation}
        />
      </View>

      <MarkerModal
        isVisible={markerModal.isVisible}
        markerId={Number(markerId)}
        hide={handleHideModal}
      />
      <MarkerFilterAction
        isVisible={filterAction.isVisible}
        hideAction={filterAction.hide}
      />
      <TutorialModal isVisible={tutorial.isVisible} hide={tutorial.hide} />
    </>
  );
}

const styling = (theme: Theme) =>
  StyleSheet.create({
    container: {
      flex: 1,
    },
    drawerButton: {
      position: 'absolute',
      left: 0,
      top: 0,
      zIndex: 1,
      paddingVertical: 10,
      paddingHorizontal: 15,
      backgroundColor: colors[theme].PINK_700,
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
  });

export default MapHomeScreen;
