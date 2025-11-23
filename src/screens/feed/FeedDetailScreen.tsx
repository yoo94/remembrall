import {StackScreenProps} from '@react-navigation/stack';
import React from 'react';
import {StyleSheet} from 'react-native';
import {Text} from 'react-native-gesture-handler';
import {SafeAreaView} from 'react-native-safe-area-context';
import {FeedStackParamList} from '@/types/navigation';

type Props = StackScreenProps<FeedStackParamList, 'FeedDetail'>;

function FeedDetailScreen({route}: Props) {
  const id = route.params.id;
  return (
    <SafeAreaView style={styles.container}>
      <Text>Feed Detail Screen {id}</Text>
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

export default FeedDetailScreen;
