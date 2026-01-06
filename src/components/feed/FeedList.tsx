import React, {useState} from 'react';
import {FlatList, StyleSheet, View, Text} from 'react-native';
import Ionicons from '@react-native-vector-icons/ionicons';
import {Pressable} from 'react-native';

import useGetInfinitePosts from '@/hooks/queries/useGetInfinitePosts';
import FeedItem from './FeedItem';
import CustomButton from '@/components/common/CustomButton';
import LoadingOverlay from '@/components/common/LoadingOverlay';
import useMutateDeletePost from '@/hooks/queries/useMutateDeletePost';
import {colors} from '@/constants/colors';
import useThemeStore from '@/store/theme';

function FeedList() {
  const {
    data: posts,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    refetch,
  } = useGetInfinitePosts();
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [selectedIds, setSelectedIds] = useState<number[]>([]);
  const [isSelectionMode, setIsSelectionMode] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const deletePost = useMutateDeletePost();
  const {theme} = useThemeStore();

  const flatPosts = posts?.pages.flat();
  const isAllSelected =
    selectedIds.length > 0 && selectedIds.length === flatPosts.length;

  const handleEndReached = () => {
    if (hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  };

  const handleRefresh = async () => {
    setIsRefreshing(true);
    await refetch();
    setIsRefreshing(false);
  };

  const handleSelectItem = (id: number) => {
    setSelectedIds(prev => {
      const newIds = prev.includes(id)
        ? prev.filter(item => item !== id)
        : [...prev, id];
      // 선택 해제되어 빈 상태면 선택 모드 종료
      if (newIds.length === 0) {
        setIsSelectionMode(false);
      } else {
        setIsSelectionMode(true);
      }
      return newIds;
    });
  };

  const handleSelectAll = () => {
    if (!flatPosts || flatPosts.length === 0) {
      return; // 데이터가 없으면 실행 안 함
    }
    if (isAllSelected) {
      setSelectedIds([]);
      setIsSelectionMode(false);
    } else {
      setIsSelectionMode(true);
      setSelectedIds(flatPosts.map(post => post.id));
    }
  };

  const handleDeleteSelected = async () => {
    setIsDeleting(true);
    try {
      // 모든 삭제 요청을 동시에 실행
      for (const id of selectedIds) {
        await new Promise<void>((resolve, reject) => {
          deletePost.mutate(id, {
            onSuccess: () => {
              resolve();
            },
            onError: error => {
              reject(error);
            },
          });
        });
      }
      // 모든 삭제가 완료될 때까지 기다린 후 한 번만 리패치
    } catch (error) {
      console.error('삭제 중 오류 발생:', error);
    } finally {
      setSelectedIds([]);
      setIsSelectionMode(false);
      setIsDeleting(false);
    }
  };

  return (
    <View style={styles.container}>
      {!flatPosts || flatPosts.length === 0 ? (
        <View style={styles.emptyContainer}>
          <Text style={styles.emptyText}>저장된 게시글이 없습니다.</Text>
        </View>
      ) : (
        <>
          <FlatList
            data={flatPosts}
            renderItem={({item}) => (
              <FeedItem
                post={item}
                isSelected={selectedIds.includes(item.id)}
                onSelectItem={handleSelectItem}
                isSelectionMode={isSelectionMode}
              />
            )}
            keyExtractor={item => String(item.id)}
            contentContainerStyle={styles.contentContainer}
            onEndReached={handleEndReached}
            onEndReachedThreshold={0.5}
            onRefresh={handleRefresh}
            refreshing={isRefreshing}
            scrollIndicatorInsets={{right: 1}}
            indicatorStyle="black"
            ItemSeparatorComponent={() => <View style={styles.separator} />}
          />
          <View style={styles.headerContainer}>
            <View style={styles.selectionHeader}>
              {isSelectionMode && (
                <>
                  <Text style={styles.selectionText}>
                    {selectedIds.length}개 선택
                  </Text>
                  <CustomButton
                    size="small"
                    label="삭제"
                    onPress={handleDeleteSelected}
                    disabled={isDeleting}
                  />
                </>
              )}
            </View>
            <Pressable style={styles.selectAllButton} onPress={handleSelectAll}>
              <Ionicons
                name={
                  isAllSelected
                    ? 'checkmark-circle'
                    : 'checkmark-circle-outline'
                }
                size={24}
                color={colors[theme].PINK_700}
              />
            </Pressable>
          </View>
        </>
      )}
      <LoadingOverlay label="삭제 중..." visible={isDeleting} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 15,
    justifyContent: 'space-between',
  },
  selectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    flex: 1,
  },
  selectAllButton: {
    paddingHorizontal: 10,
    paddingVertical: 5,
  },
  selectionText: {
    flex: 1,
    fontSize: 14,
    fontWeight: '600',
  },
  contentContainer: {
    padding: 15,
  },
  separator: {
    height: 1,
    backgroundColor: '#e6e6e6',
    marginVertical: 8,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyText: {
    fontSize: 16,
    color: '#999',
  },
});

export default FeedList;