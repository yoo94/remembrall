import React from 'react';
import {Pressable, StyleSheet, Text} from 'react-native';
import Icon from '@react-native-vector-icons/ionicons';

import {colors} from '@/constants';

interface ImageInputProps {
  onChange: () => void;
}

function ImageInput({onChange}: ImageInputProps) {
  return (
    <Pressable style={styles.imageInput} onPress={onChange}>
      <Icon name="camera-outline" size={20} color={colors.GRAY_500} />
      <Text style={styles.text}>사진 추가</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  imageInput: {
    borderWidth: 1.5,
    borderColor: colors.GRAY_300,
    borderStyle:'dotted',
    height:70,
    width:70,
    justifyContent:'center',
    alignItems:'center',
  },
  text: {
    color: colors.GRAY_500,
    fontSize: 14,
  },
});

export default ImageInput;
