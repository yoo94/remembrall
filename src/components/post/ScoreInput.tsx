import React from 'react';
import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import {colors} from '@/constants/colors';
import useThemeStore, {Theme} from '@/store/theme';
import CustomMarker from '../common/CustomMarker';

interface ScoreInputProps {
  score: number;
  onChangeScore: (value: number) => void;
}

function ScoreInput({score, onChangeScore}: ScoreInputProps) {
  const {theme} = useThemeStore();
  const styles = styling(theme);

  return (
    <View style={styles.container}>
      <View style={styles.labelContainer}>
        <Text style={styles.labelText}>마커 모양</Text>
      </View>
      <View style={styles.markerRow}>
        {[1, 2, 3, 4, 5].map(s => (
          <TouchableOpacity
            key={s}
            style={[
              styles.markerWrapper,
              score === s && styles.selectedMarkerWrapper,
            ]}
            onPress={() => onChangeScore(s)}
            activeOpacity={0.7}>
            <CustomMarker color={colors[theme].ICON} score={s} />
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
}

const styling = (theme: Theme) =>
  StyleSheet.create({
    container: {
      flex: 1,
      gap: 5,
      padding: 15,
      borderWidth: 1,
      borderColor: colors[theme].GRAY_200,
    },
    labelContainer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      marginBottom: 8,
    },
    labelText: {
      color: colors[theme].GRAY_700,
    },
    markerRow: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginTop: 8,
    },
    markerWrapper: {
      padding: 2,
      borderRadius: 8,
    },
    selectedMarkerWrapper: {
      backgroundColor: colors[theme].GRAY_200,
    },
    smallText: {
      color: colors[theme].GRAY_700,
      fontSize: 12,
    },
  });

export default ScoreInput;