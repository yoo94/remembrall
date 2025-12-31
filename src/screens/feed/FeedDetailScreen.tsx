import React from 'react';
import {
  Dimensions,
  Image,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import {StackScreenProps} from '@react-navigation/stack';
import Ionicons from '@react-native-vector-icons/ionicons';
import CustomMarker from '@/components/common/CustomMarker';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {useNavigation} from '@react-navigation/native';

import {FeedStackParamList} from '@/types/navigation';
import {colors} from '@/constants/colors';
import useGetPost from '@/hooks/queries/useGetPost';
import {baseUrls} from '@/api/axios';
import {getDateTimeWithSeparator} from '@/utils/date';
import CustomButton from '@/components/common/CustomButton';
import PreviewImageList from '@/components/common/PreviewImageList';
import useLocationStore from '@/store/location';
import FeedDetailActionSheet from '@/components/feed/FeedDetailActionSheet';
import useModal from '@/hooks/useModal';
import useMutateFavoritePost from '@/hooks/queries/useMutateFavoritePost';
import useThemeStore, {Theme} from '@/store/theme';

type Props = StackScreenProps<FeedStackParamList, 'FeedDetail'>;

function FeedDetailScreen({route}: Props) {
  const {theme} = useThemeStore();
  const styles = styling(theme);
  const {id} = route.params;
  const navigation = useNavigation();
  const insets = useSafeAreaInsets();
  const {data: post, isPending, isError} = useGetPost(id);
  const {setMoveLocation} = useLocationStore();
  const detailAction = useModal();
  const favoriteMutation = useMutateFavoritePost();

  if (isPending || isError) {
    return <></>;
  }

  const handlePressLocation = () => {
    const {latitude, longitude} = post;
    setMoveLocation({latitude, longitude});

    navigation.navigate('Map', {
      screen: 'MapHome',
    });
    setTimeout(() => {
      setMoveLocation(null);
    }, 1000);
  };

  return (
    <>
      <View style={[styles.header, {top: insets.top}]}>
        <Ionicons
          name="chevron-back"
          size={30}
          color={colors[theme].BLACK}
          onPress={() => navigation.goBack()}
        />
        <Ionicons
          name="ellipsis-vertical"
          size={30}
          color={colors[theme].BLACK}
          onPress={detailAction.show}
        />
      </View>
      <ScrollView>
        <View style={styles.imageContainer}>
          {post.imageUris.length > 0 && (
            <Image
              style={styles.image}
              source={{
                uri: `${
                  Platform.OS === 'ios' ? baseUrls.ios : baseUrls.android
                }/${post.imageUris[0].uri}`,
              }}
              resizeMode="cover"
            />
          )}
          {post.imageUris.length === 0 && (
            <View style={styles.emptyImageContainer}>
              <Text>No Image</Text>
            </View>
          )}
        </View>

        <View style={styles.contentsContainer}>
          <View style={styles.addressContainer}>
            <Ionicons
              name="location"
              size={10}
              color={colors[theme].GRAY_500}
            />
            <Text
              style={styles.addressText}
              ellipsizeMode="tail"
              numberOfLines={1}>
              {post.address}
            </Text>
          </View>
          <Text style={styles.titleText}>{post.title}</Text>
          <View style={styles.infoContainer}>
            <View style={styles.infoRow}>
              <View style={styles.infoColumn}>
                <Text style={styles.infoColumnKeyText}>방문날짜</Text>
                <Text style={styles.infoColumnValueText}>
                  {getDateTimeWithSeparator(post.date, '.')}
                </Text>
              </View>
            </View>
            <View style={styles.divider} />
            <View style={styles.infoRow}>
              <View style={styles.infoColumn}>
                <Text style={styles.infoColumnKeyText}>마커</Text>
                <CustomMarker color={post.color} score={post.score} />
              </View>
            </View>
            <View style={styles.divider} />
            <View style={styles.infoRow}>
              <View style={styles.infoColumn}>
                <Text style={styles.descriptionText}>{post.description}</Text>
              </View>
            </View>
          </View>
          <View style={styles.divider} />
          <View style={styles.infoRow}>
            <View style={styles.infoColumn}>
              <Text style={styles.descriptionText}>
                {post.meter
                  ? `알림이 울릴 거리 : ${post.meter} M(미터)`
                  : '알림 지정안함'}
              </Text>
            </View>
          </View>
        </View>
        <View style={{height: 10, backgroundColor: colors[theme].GRAY_100}} />
        {post.imageUris.length > 0 && (
          <View style={styles.imageContentsContainer}>
            <PreviewImageList imageUris={post.imageUris} />
          </View>
        )}
      </ScrollView>

      <View style={[styles.bottomContainer, {paddingBottom: insets.bottom}]}>
        <CustomButton
          size="small"
          label={
            <Ionicons
              name="star"
              size={25}
              color={
                post.isFavorite ? colors[theme].YELLOW_500 : colors[theme].WHITE
              }
            />
          }
          style={{paddingHorizontal: 5}}
          onPress={() => favoriteMutation.mutate(post.id)}
        />
        <CustomButton
          size="small"
          label="위치보기"
          style={{width: '50%'}}
          onPress={handlePressLocation}
        />
      </View>

      <FeedDetailActionSheet
        id={post.id}
        isVisible={detailAction.isVisible}
        hideAction={detailAction.hide}
      />
    </>
  );
}

const styling = (theme: Theme) =>
  StyleSheet.create({
    header: {
      zIndex: 1,
      position: 'absolute',
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      paddingHorizontal: 15,
      paddingVertical: 10,
      width: '100%',
    },
    imageContainer: {
      width: Dimensions.get('screen').width,
      height: Dimensions.get('screen').width,
    },
    image: {
      width: '100%',
      height: '100%',
    },
    imageContentsContainer: {
      paddingVertical: 15,
      backgroundColor: colors[theme].WHITE,
      marginBottom: 10,
    },
    divider: {
      height: StyleSheet.hairlineWidth,
      backgroundColor: colors[theme].GRAY_200,
      marginVertical: 10,
    },
    emptyImageContainer: {
      height: Dimensions.get('screen').width,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: colors[theme].GRAY_200,
      borderColor: colors[theme].GRAY_200,
      borderWidth: 1,
    },
    contentsContainer: {
      padding: 20,
      backgroundColor: colors[theme].WHITE,
      marginBottom: 10,
    },
    addressContainer: {
      gap: 5,
      marginVertical: 10,
      flexDirection: 'row',
      alignItems: 'center',
    },
    addressText: {
      color: colors[theme].GRAY_500,
      fontSize: 12,
    },
    titleText: {
      fontSize: 22,
      fontWeight: 'bold',
      color: colors[theme].BLACK,
    },
    infoContainer: {
      marginVertical: 20,
      gap: 8,
    },
    infoRow: {
      flexDirection: 'row',
    },
    infoColumn: {
      flex: 1,
      flexDirection: 'row',
      alignItems: 'center',
      gap: 5,
    },
    infoColumnKeyText: {
      color: colors[theme].BLACK,
    },
    infoColumnValueText: {
      color: colors[theme].PINK_700,
    },
    markerColor: {
      width: 10,
      height: 10,
      borderRadius: 10,
    },
    descriptionText: {
      color: colors[theme].BLACK,
      lineHeight: 25,
      fontSize: 16,
    },
    bottomContainer: {
      position: 'absolute',
      bottom: 0,
      width: '100%',
      alignItems: 'center',
      flexDirection: 'row',
      justifyContent: 'flex-end',
      paddingTop: 10,
      paddingHorizontal: 20,
      backgroundColor: colors[theme].WHITE,
      borderTopWidth: StyleSheet.hairlineWidth,
      borderColor: colors[theme].GRAY_200,
      gap: 5,
    },
  });

export default FeedDetailScreen;