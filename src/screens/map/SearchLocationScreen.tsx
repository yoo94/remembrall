import React from 'react';
import { StyleSheet } from 'react-native';
import { Text } from 'react-native-gesture-handler';
import { SafeAreaView } from 'react-native-safe-area-context';

interface SearchLocationProps {}

function SearchLocation({}: SearchLocationProps) {
  return (
    <SafeAreaView style={styles.container}>
      <Text>Search Location Screen</Text>
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

export default SearchLocation;
