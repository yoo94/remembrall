import React from 'react';
import { StyleSheet } from 'react-native';
import { Text } from 'react-native-gesture-handler';
import { SafeAreaView } from 'react-native-safe-area-context';

interface CalendarScreenProps {}

function CalendarScreen({}: CalendarScreenProps) {
  return (
    <SafeAreaView style={styles.container}>
      <Text>Calendar Screen</Text>
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

export default CalendarScreen;
