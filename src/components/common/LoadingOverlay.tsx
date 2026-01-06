import React from 'react';
import {
  ActivityIndicator,
  Modal,
  Text,
  View,
  StyleSheet,
} from 'react-native';
import {colors} from '@/constants/colors';

interface LoadingOverlayProps {
  label: string;
  visible?: boolean;
}

function LoadingOverlay({label, visible = false}: LoadingOverlayProps) {
  return (
    <Modal visible={visible} transparent animationType="fade">
      <View style={styles.modalBackground}>
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color={colors.light.BLUE_500} />
          <Text style={styles.loadingText}>{label}</Text>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
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