import React from 'react';
import {ActivityIndicator, Text, View, StyleSheet} from 'react-native';
import {colors} from '@/constants/colors';

interface LoadingOverlayProps {
  label: string;
  visible?: boolean;
}

function LoadingOverlay({label, visible = false}: LoadingOverlayProps) {
  if (!visible) return null;

  return (
    <View style={styles.absoluteOverlay}>
      <View style={styles.modalBackground}>
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color={colors.light.BLUE_500} />
          <Text style={styles.loadingText}>{label}</Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  absoluteOverlay: {
    ...StyleSheet.absoluteFillObject,
    zIndex: 9999,
  },
  modalBackground: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingContainer: {
    backgroundColor: 'white',
    padding: 30,
    borderRadius: 10,
    alignItems: 'center',
    gap: 15,
  },
  loadingText: {
    fontSize: 16,
    color: colors.light.GRAY_700,
  },
});

export default LoadingOverlay;