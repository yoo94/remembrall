import React from 'react';
import {StyleSheet, View} from 'react-native';
import FeedList from '@/components/feed/FeedList';

function FeedListScreen() {
  return (
    <View style={styles.container}>
      <FeedList />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default FeedListScreen;