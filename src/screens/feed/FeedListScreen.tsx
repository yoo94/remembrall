import React from 'react';
import {StyleSheet} from 'react-native';
import FeedList from '@/components/feed/FeedList';
import {SafeAreaView} from 'react-native-safe-area-context';

function FeedListScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <FeedList />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default FeedListScreen;
