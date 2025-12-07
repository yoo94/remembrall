import {QueryClientProvider} from '@tanstack/react-query';
import RootNavigation from './src/navigations/RootNavigation';
import queryClient from '@/api/queryClient';
import Toast, {
  BaseToast,
  BaseToastProps,
  ErrorToast,
} from 'react-native-toast-message';
import {colors} from '@/constants/colors';

const toastConfig = {
  success: (props: BaseToastProps) => (
    <BaseToast
      {...props}
      style={[styles.toastSuccess]}
      text1Style={styles.text1}
      text2Style={styles.text2}
    />
  ),
  error: (props: BaseToastProps) => (
    <ErrorToast
      {...props}
      style={[styles.toastError]}
      text1Style={styles.text1}
      text2Style={styles.text2}
    />
  ),
};

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <RootNavigation />
      <Toast config={toastConfig} />
    </QueryClientProvider>
  );
}

const styles = StyleSheet.create({
  toastSuccess: {
    borderLeftColor: colors.BLUE_500,
  },
  toastError: {
    borderLeftColor: colors.RED_500,
  },
  text1: {
    fontSize: 14,
  },
  text2: {
    fontSize: 12,
  },
});

export default App;
