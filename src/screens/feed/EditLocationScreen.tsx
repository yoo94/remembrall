import React from 'react';
import { StyleSheet } from 'react-native';
import { Text } from 'react-native-gesture-handler';
import { SafeAreaView } from 'react-native-safe-area-context';

interface EditLocationScreenProps {}

function EditLocationScreen({}: EditLocationScreenProps) {
  return (
    <SafeAreaView style={styles.container}>
      <Text>Edit Location Screen</Text>
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

export default EditLocationScreen;
