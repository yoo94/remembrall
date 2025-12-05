import React from 'react';
import {FlatList} from 'react-native';
import useGetInfinitePosts from '@/hooks/queries/useGetInfinitePosts';
import FeedItem from './FeedItem';

function FeedList() {
  const {
    data: posts,
  } = useGetInfinitePosts();

console.log(posts)
  return (
    <FlatList
      data={posts?.pages.flat()}
      renderItem={({item}) => <FeedItem post={item} />}
      keyExtractor={item => String(item.id)}
    />
  );
}


export default FeedList;