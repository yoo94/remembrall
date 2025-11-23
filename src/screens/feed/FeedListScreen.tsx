import {StackNavigationProp} from '@react-navigation/stack';
import React from 'react';
import {StyleSheet} from 'react-native';
import {Text} from 'react-native-gesture-handler';
import {SafeAreaView} from 'react-native-safe-area-context';
import {FeedStackParamList} from '@/types/navigation';
import {useNavigation} from '@react-navigation/native';

type Navigation = StackNavigationProp<FeedStackParamList>;
function FeedListScreen() {
  const navigation = useNavigation<Navigation>();
  return (
    <SafeAreaView style={styles.container}>
      <Text>Feed List Screen</Text>
      <Text
        onPress={() => {
          navigation.navigate('FeedDetail', {id: 1});
        }}>
        Feed Item 1번
      </Text>
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
