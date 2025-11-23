import React from 'react';
import {Pressable, StyleSheet, ViewStyle, StyleProp} from 'react-native';
import {DrawerNavigationProp} from '@react-navigation/drawer';
import {useNavigation} from '@react-navigation/native';
import Ionicons from '@react-native-vector-icons/ionicons';

import {MainDrawerParamList} from '@/types/navigation';
import {colors} from '@/constants/colors';

type Navigation = DrawerNavigationProp<MainDrawerParamList>;

interface DrawerButtonProps {
  color?: string;
  style?: StyleProp<ViewStyle>;
}

function DrawerButton({color = colors.BLACK, style}: DrawerButtonProps) {
  const navigation = useNavigation<Navigation>();

  return (
    <Pressable
      style={[styles.container, style]}
      onPress={() => navigation.openDrawer()}>
      <Ionicons name="menu" size={25} color={color} />
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 12,
  },
});

export default DrawerButton;
