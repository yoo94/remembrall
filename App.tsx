import {QueryClientProvider} from '@tanstack/react-query';
import Toast, {
  BaseToast,
  BaseToastProps,
  ErrorToast,
} from 'react-native-toast-message';
import React, {useEffect} from 'react';
import BootSplash from 'react-native-bootsplash';
import RootNavigation from './src/navigations/RootNavigation';
import queryClient from '@/api/queryClient';
import {colors} from '@/constants/colors';
import useThemeStorage from '@/hooks/useThemeStorage';
import {StatusBar, Platform, PermissionsAndroid} from 'react-native';
import {Alert} from 'react-native';
import PushNotification from 'react-native-push-notification';
import {getApp} from '@react-native-firebase/app';
import {
  getMessaging,
  requestPermission,
  onMessage,
  onTokenRefresh,
  getToken,
  AuthorizationStatus,
} from '@react-native-firebase/messaging';
import useLocationStore from '@/store/location';

const toastConfig = {
  success: (props: BaseToastProps) => (
    <BaseToast
      {...props}
      style={{borderLeftColor: colors['light'].BLUE_500}}
      text1Style={{fontSize: 14}}
      text2Style={{fontSize: 12}}
    />
  ),
  error: (props: BaseToastProps) => (
    <ErrorToast
      {...props}
      style={{borderLeftColor: colors['light'].RED_500}}
      text1Style={{fontSize: 14}}
      text2Style={{fontSize: 12}}
    />
  ),
};

function App() {
  const {theme} = useThemeStorage();
  const {setSelectedMarkerId} = useLocationStore();
  const requestUserPermission = async () => {
    if (Platform.OS === 'android') {
      if (PermissionsAndroid && Platform.Version >= 33) {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.POST_NOTIFICATIONS,
        );
        return granted === PermissionsAndroid.RESULTS.GRANTED;
      }
      return true;
    } else {
      const app = getApp();
      const messagingInstance = getMessaging(app);
      const status = await requestPermission(messagingInstance);
      return (
        status === AuthorizationStatus.AUTHORIZED ||
        status === AuthorizationStatus.PROVISIONAL
      );
    }
  };

  const getFcmToken = async () => {
    const app = getApp();
    const messagingInstance = getMessaging(app);
    const status = await requestPermission(messagingInstance);
    const enabled =
      status === AuthorizationStatus.AUTHORIZED ||
      status === AuthorizationStatus.PROVISIONAL;
    if (!enabled) {
      console.log('알림 권한 거부됨');
      return null;
    }
    const token = await getToken(messagingInstance);
    return token;
  };

  useEffect(() => {
    const app = getApp();
    const messagingInstance = getMessaging(app);

    const init = async () => {
      const granted = await requestUserPermission();
      if (granted) await getFcmToken();
    };
    init();

    const onMessageUnsub = onMessage(messagingInstance, async remoteMessage => {
      console.log('[Remote Message] ', JSON.stringify(remoteMessage));
    });

    const onTokenUnsub = onTokenRefresh(messagingInstance, token => {
      console.log('🔁 FCM 토큰 갱신:', token);
    });

    return () => {
      onMessageUnsub();
      onTokenUnsub();
    };
  }, []);

  useEffect(() => {
    const init = async () => {
      await new Promise(resolve => setTimeout(resolve, 1000));
    };
    init().finally(async () => {
      await BootSplash.hide({fade: true});
      console.log('BootSplash has been hidden successfully');
    });
  }, []);

  useEffect(() => {
    const app = getApp();
    const messagingInstance = getMessaging(app);
    const unsubscribe = onMessage(messagingInstance, async remoteMessage => {
      Alert.alert('새 메시지', JSON.stringify(remoteMessage.notification));
      // 또는 Toast 등 원하는 UI 처리
    });
    return unsubscribe;
  }, []);

  useEffect(() => {
    PushNotification.configure({
      onNotification: function (notification) {
        if (notification.userInteraction) {
          // 알림 클릭 시
          const markerId = notification.data?.markerId;
          if (markerId) {
            setSelectedMarkerId(Number(markerId));
          }
        }
      },
      requestPermissions: false,
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <StatusBar
        barStyle={theme === 'light' ? 'dark-content' : 'light-content'}
      />
      <RootNavigation />
      <Toast config={toastConfig} />
    </QueryClientProvider>
  );
}

export default App;