import React from 'react';
import {Image, Platform, Pressable, StyleSheet, Text, View} from 'react-native';
import {baseUrls} from '@/api/axios';
import {colors} from '@/constants/colors';
import {Post} from '@/types/domain';
import {getDateTimeWithSeparator} from '@/utils/date';
import {useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import {FeedStackParamList} from '@/types/navigation';
import useThemeStore, {Theme} from '@/store/theme';

interface FeedItemProps {
  post: Post;
}

function FeedItem({post}: FeedItemProps) {
  const {theme} = useThemeStore();
  const styles = styling(theme);
  const navigation = useNavigation<StackNavigationProp<FeedStackParamList>>();

  return (
    <Pressable
      style={styles.container}
      onPress={() => navigation.navigate('FeedDetail', {id: post.id})}>
      <View style={styles.imageContainer}>
        {post.imageUris.length > 0 ? (
          <Image
            style={styles.image}
            source={{
              uri: `${
                Platform.OS === 'ios' ? baseUrls.ios : baseUrls.android
              }/${post.imageUris[0].uri}`,
            }}
            resizeMode="cover"
          />
        ) : (
          <View style={[styles.image, styles.emptyImageContainer]}>
            <Text style={styles.emptyText}>No Image</Text>
          </View>
        )}
      </View>

      <View style={styles.textContainer}>
        <Text style={styles.dateText}>
          {getDateTimeWithSeparator(post.date, '/')}
        </Text>
        <Text style={styles.titleText} numberOfLines={1}>
          {post.title}
        </Text>
        <Text style={styles.descriptionText} numberOfLines={2}>
          {post.description}
        </Text>
      </View>
    </Pressable>
  );
}

const IMAGE_SIZE = 90;

const styling = (theme: Theme) =>
  StyleSheet.create({
    container: {
      flexDirection: 'row',
      alignItems: 'center',
      paddingVertical: 8,
      paddingHorizontal: 2,
    },
    imageContainer: {
      width: IMAGE_SIZE,
      height: IMAGE_SIZE,
      borderRadius: 6,
      overflow: 'hidden',
      backgroundColor: colors[theme].GRAY_100,
    },
    image: {
      width: '100%',
      height: '100%',
    },
    emptyImageContainer: {
      justifyContent: 'center',
      alignItems: 'center',
      borderColor: colors[theme].GRAY_200,
      borderWidth: 1,
      backgroundColor: 'transparent',
    },
    emptyText: {
      color: colors[theme].GRAY_500,
      fontSize: 12,
    },
    textContainer: {
      flex: 1,
      marginLeft: 12,
      justifyContent: 'center',
    },
    dateText: {
      color: colors[theme].PINK_700,
      fontWeight: '600',
      fontSize: 12,
    },
    titleText: {
      color: colors[theme].BLACK,
      fontWeight: '500',
      fontSize: 15,
      marginTop: 2,
    },
    descriptionText: {
      color: colors[theme].GRAY_500,
      fontSize: 13,
      marginTop: 4,
    },
  });

export default FeedItem;