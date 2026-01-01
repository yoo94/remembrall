// src/components/common/CheckBoxField.tsx
import React from 'react';
import {
  Pressable,
  StyleSheet,
  View,
  Text,
  ViewStyle,
} from 'react-native';
import Ionicons from '@react-native-vector-icons/ionicons';
import {colors} from '@/constants/colors';
import useThemeStore from '@/hooks/useThemeStorage';

interface CheckBoxFieldProps {
  checked: boolean;
  onPress: (value: boolean) => void;
  label: string;
  description?: string;
  disabled?: boolean;
  style?: ViewStyle;
}

function CheckBoxField({
  checked,
  onPress,
  label,
  description,
  disabled = false,
  style,
}: CheckBoxFieldProps) {
  const {theme} = useThemeStore();
  const themeColors = colors[theme];

  const checkboxStyles = StyleSheet.create({
    container: {
      flexDirection: 'row',
      alignItems: 'flex-start',
      padding: 12,
      borderRadius: 8,
      backgroundColor: checked
        ? themeColors.BLUE_500
        : themeColors.GRAY_100,
      borderWidth: 1.5,
      borderColor: checked
        ? themeColors.BLUE_500
        : themeColors.GRAY_200,
      opacity: disabled ? 0.5 : 1,
    },
    checkbox: {
      width: 24,
      height: 24,
      borderRadius: 6,
      backgroundColor: checked ? themeColors.BLUE_500 : themeColors.WHITE,
      borderWidth: 2,
      borderColor: checked ? themeColors.BLUE_500 : themeColors.GRAY_300,
      justifyContent: 'center',
      alignItems: 'center',
      marginRight: 12,
      marginTop: 2,
    },
    textContainer: {
      flex: 1,
    },
    label: {
      fontSize: 16,
      fontWeight: '600',
      color: themeColors.BLACK,
      marginBottom: description ? 4 : 0,
    },
    description: {
      fontSize: 13,
      color: themeColors.GRAY_500,
      lineHeight: 18,
    },
  });

  return (
    <Pressable
      disabled={disabled}
      onPress={() => onPress(!checked)}
      style={({pressed}) => [
        checkboxStyles.container,
        pressed && {opacity: 0.8},
        style,
      ]}>
      <View style={checkboxStyles.checkbox}>
        {checked && (
          <Ionicons
            name="checkmark"
            size={16}
            color={themeColors.WHITE}
          />
        )}
      </View>
      <View style={checkboxStyles.textContainer}>
        <Text style={checkboxStyles.label}>{label}</Text>
        {description && (
          <Text style={checkboxStyles.description}>{description}</Text>
        )}
      </View>
    </Pressable>
  );
}

export default CheckBoxField;