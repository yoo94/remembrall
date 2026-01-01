import React from 'react';
import {StyleSheet, View} from 'react-native';
import {LatLng, Marker, MyMapMarkerProps} from 'react-native-maps';
import Ionicons from '@react-native-vector-icons/ionicons';

import {colors} from '@/constants/colors';
import useThemeStore, {Theme} from '@/store/theme';

interface CustomMarkerProps extends MyMapMarkerProps {
  coordinate?: LatLng;
  color: string;
  score?: number;
  isSelected?: boolean;
}

function CustomMarker({
  coordinate,
  color,
  score = 5,
  isSelected = false,
  ...props
}: CustomMarkerProps) {
  const {theme} = useThemeStore();
  const styles = styling(theme);
  const getIconName = (s: number) => {
    if (s >= 5) return 'heart-outline';
    if (s === 4) return 'star-outline';
    if (s === 3) return 'restaurant-outline';
    if (s === 2) return 'checkmark-outline';
    return 'alert-outline';
  };

  const markerView = (
    <View style={[styles.container, isSelected && styles.selectedContainer]}>
      <View
        style={[
          styles.marker,
          {backgroundColor: color},
          isSelected && styles.selectedMarker,
        ]}>
        <View style={styles.iconWrapper}>
          <Ionicons
            name={getIconName(score)}
            size={18}
            color={colors[theme].UNCHANGE_BLACK}
          />
        </View>
      </View>
      {isSelected && <View style={styles.pulseRing} />}
    </View>
  );

  return coordinate ? (
    <Marker coordinate={coordinate} {...props}>
      {markerView}
    </Marker>
  ) : (
    markerView
  );
}

const styling = (theme: Theme) =>
  StyleSheet.create({
    container: {
      height: 35,
      width: 32,
      alignItems: 'center',
    },
    marker: {
      transform: [{rotate: '45deg'}],
      width: 27,
      height: 27,
      borderRadius: 27,
      borderColor: colors[theme].UNCHANGE_BLACK,
      borderBottomRightRadius: 1,
      borderWidth: 1,
    },
    selectedMarker: {
      borderWidth: 4,
      borderColor: colors[theme].BLACK,
      elevation: 10,
    },
    iconWrapper: {
      transform: [{rotate: '-45deg'}],
      alignItems: 'center',
      justifyContent: 'center',
      width: '100%',
      height: '100%',
    },
  });

export default CustomMarker;