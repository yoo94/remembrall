import {colors} from '@/constants';
import FontAwesome6 from '@react-native-vector-icons/fontawesome6';
import React, {ComponentProps} from 'react';
import {Pressable, StyleSheet} from 'react-native';

type SolidIconName = Extract<
  ComponentProps<typeof FontAwesome6>['name'],
  {iconStyle: 'solid'}
>;

interface MapIconButtonProps {
  name: SolidIconName;
  onPress: () => void;
}

const MapIconButton = ({name, onPress}: MapIconButtonProps) => {
  return (
    <Pressable style={styles.mapButton} onPress={onPress}>
      <FontAwesome6
        iconStyle="solid"
        size={24}
        name={name}
        color={colors.WHITE}
      />
    </Pressable>
  );
};

const styles = StyleSheet.create({
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

export default MapIconButton;
