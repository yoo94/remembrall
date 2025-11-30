import React from 'react';
import {Pressable, StyleSheet, View} from 'react-native';
import {colors} from '@/constants/colors';
import {ScrollView, Text} from 'react-native-gesture-handler';
import CustomMarker from './CustomMarker';

interface MarkerColorInputProps {
  color: string;
  onChangeColor: (value: string) => void;
}

const MarkerColorInput = ({color, onChangeColor}: MarkerColorInputProps) => {
  return (
    <View style={styles.container}>
      <Text style={styles.markerLabel}>중요도 선택</Text>
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        <View style={styles.markerInputScroll}>
          {[
            colors.PINK_400,
            colors.BLUE_400,
            colors.GREEN_400,
            colors.YELLOW_400,
            colors.PURPLE_400,
          ].map(selectColor => {
            return (
              <Pressable
                style={[
                  styles.markerBox,
                  color === selectColor && styles.pressedMarker,
                ]}
                key={selectColor}
                onPress={() => onChangeColor(selectColor)}>
                <CustomMarker color={selectColor} score={5} />
              </Pressable>
            );
          })}
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.GRAY_200,
    borderWidth: 1,
    padding: 15,
  },
  markerLabel: {
    marginBottom: 15,
    color: colors.GRAY_700,
  },
  markerInputScroll: {
    flexDirection: 'row',
    gap: 20,
  },
  markerBox: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 50,
    height: 50,
    borderRadius: 6,
    borderWidth: 1,
    backgroundColor: colors.GRAY_100,
  },
  pressedMarker: {
    borderColor: colors.RED_500,
    borderWidth: 2,
  },
});

export default MarkerColorInput;
