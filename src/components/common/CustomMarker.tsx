import React from 'react';
import {StyleSheet, View, Text} from 'react-native';
import {LatLng, Marker, MyMapMarkerProps} from 'react-native-maps';

import {colors} from '@/constants/colors';
import useThemeStore, {Theme} from '@/store/theme';

type MarkerShape = 'default' | 'heart' | 'star' | 'check' | 'exclaim' | 'crown';

interface CustomMarkerProps extends MyMapMarkerProps {
  coordinate?: LatLng;
  color: string;
  score?: number;
  shape?: MarkerShape;
}

function CustomMarker({
  coordinate,
  color,
  score = 5,
  shape = 'default',
  ...props
}: CustomMarkerProps) {
  const {theme} = useThemeStore();
  const styles = styling(theme);

  const symbolMap: Record<MarkerShape, string> = {
    default: '',
    heart: '❤',
    star: '★',
    check: '✔',
    exclaim: '!',
    crown: '👑',
  };

  const markerView = (
    <View style={styles.container}>
      <View style={[styles.marker, {backgroundColor: color}]}>
        {shape === 'default' ? (
          <>
            <View style={[styles.eye, styles.leftEye]} />
            <View style={[styles.eye, styles.rightEye]} />
            {score > 3 && <View style={[styles.mouth, styles.good]} />}
            {score === 3 && <View style={styles.soso} />}
            {score < 3 && <View style={[styles.mouth, styles.bad]} />}
          </>
        ) : (
          <View style={styles.symbolWrapper}>
            <View style={styles.symbolCounterRotate}>
              <Text style={styles.symbolText}>{symbolMap[shape]}</Text>
            </View>
          </View>
        )}
      </View>
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
    eye: {
      position: 'absolute',
      backgroundColor: colors[theme].UNCHANGE_BLACK,
      width: 4,
      height: 4,
      borderRadius: 4,
    },
    leftEye: {
      top: 12,
      left: 5,
    },
    rightEye: {
      top: 5,
      left: 12,
    },
    mouth: {
      transform: [{rotate: '45deg'}],
      width: 12,
      height: 12,
      borderWidth: 1,
      borderRadius: 12,
      borderTopColor: 'rgba(255,255,255 / 0.01)',
      borderBottomColor: 'rgba(255,255,255 / 0.01)',
    },
    good: {
      marginLeft: 5,
      marginTop: 5,
      borderLeftColor: 'rgba(255,255,255 / 0.01)',
    },
    bad: {
      marginLeft: 12,
      marginTop: 12,
      borderRightColor: 'rgba(255,255,255 / 0.01)',
    },
    soso: {
      width: 8,
      height: 8,
      borderLeftColor: colors[theme].UNCHANGE_BLACK,
      borderLeftWidth: 1,
      marginLeft: 13,
      marginTop: 13,
      transform: [{rotate: '45deg'}],
    },

    /* symbol styles for heart/star/check/exclaim/crown */
    symbolWrapper: {
      position: 'absolute',
      left: 0,
      right: 0,
      top: 0,
      bottom: 0,
      alignItems: 'center',
      justifyContent: 'center',
    },
    symbolCounterRotate: {
      transform: [{rotate: '-45deg'}],
      alignItems: 'center',
      justifyContent: 'center',
    },
    symbolText: {
      color: colors[theme].UNCHANGE_BLACK,
      fontSize: 12,
      lineHeight: 14,
    },
  });

export default CustomMarker;