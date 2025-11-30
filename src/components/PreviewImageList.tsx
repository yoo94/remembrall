import React from 'react';
import {baseUrls} from '@/api/axios';
import {
  Image,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  View,
} from 'react-native';
import Icon from '@react-native-vector-icons/ionicons';

import {ImageUri} from '@/types';
import {colors} from '@/constants';

interface PreviewImageListProps {
  imageUris: ImageUri[];
  onDelete?: (uri: string) => void;
  onChangeOrder?: (fromIndex: number, toIndex: number) => void;
}

function PreviewImageList({
  imageUris,
  onDelete,
}: PreviewImageListProps) {
  return (
    <ScrollView horizontal showsHorizontalScrollIndicator={false}>
      <View style={styles.container}>
        {imageUris.map(({uri}) => {
          return (
            <Pressable key={uri} style={styles.imageContainer}>
              <Image
              style={styles.image}
              source={{
                uri: `${Platform.OS === 'ios' ? baseUrls.ios : baseUrls.android}/${uri}`,
              }}
              resizeMode="cover"
            />
              {onDelete && (
                <Pressable
                  style={[styles.imageButton, styles.deleteButton]}
                  onPress={() => onDelete?.(uri)}>
                  <Icon name="close-circle" size={20} color={colors.WHITE} />
                </Pressable>
              )}
            </Pressable>
          );
        })}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    paddingHorizontal: 15,
    gap: 15,
  },
  imageContainer: {
    width: 70,
    height: 70,
  },
  image: {
    width: '100%',
    height: '100%',
  },
  imageButton: {
    position: 'absolute',
    backgroundColor: colors.BLACK,
    zIndex: 1,
  },
  deleteButton: {
    top: 0,
    right: 0,
  },
  moveLeftButton: {
    bottom: 0,
    left: 0,
  },
  moveRightButton: {
    bottom: 0,
    right: 0,
  },
});

export default PreviewImageList;