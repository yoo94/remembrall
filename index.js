import {AppRegistry} from 'react-native';
import {getApp} from '@react-native-firebase/app';
import {
  getMessaging,
  setBackgroundMessageHandler,
} from '@react-native-firebase/messaging';
import PushNotification from 'react-native-push-notification';
import App from './App';
import {name as appName} from './app.json';

const app = getApp();
const messagingInstance = getMessaging(app);



// 로컬 알림 클릭 이벤트 처리
PushNotification.configure({
  onNotification: function (notification) {
    console.log('알림 수신/클릭:', notification);

    // 알림 클릭 시
    if (notification.userInteraction) {
      const markerId = notification.data?.markerId;
      if (markerId) {
        // store에 선택된 마커 ID 저장
        const useLocationStore = require('./src/store/location').default;
        useLocationStore.getState().setSelectedMarkerId(Number(markerId));

        // MapHome으로 네비게이션
        const {navigate} = require('./src/navigations/navigationRef');
        setTimeout(() => {
          navigate('Map', {screen: 'MapHome'});
        }, 100);
      }
    }
  },
  requestPermissions: true,
  popInitialNotification: true,
});

// Android 채널 생성 (필수)
PushNotification.createChannel(
  {
    channelId: 'default-channel-id',
    channelName: 'Default Channel',
    importance: 4,
    vibrate: true,
  },
  created => console.log(`채널 생성: ${created}`),
);

setBackgroundMessageHandler(messagingInstance, async remoteMessage => {
  console.log('백그라운드 메시지 수신:', remoteMessage);

  // ✅ 백그라운드에서도 로컬 알림으로 표시
  PushNotification.localNotification({
    channelId: 'default-channel-id',
    title: remoteMessage.notification?.title || '알림',
    message: remoteMessage.notification?.body || '',
    userInteraction: false,
    data: remoteMessage.data,
    userInfo: remoteMessage.data,
  });
});

AppRegistry.registerComponent(appName, () => App);