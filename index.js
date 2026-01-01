import {AppRegistry} from 'react-native';
import {getApp} from '@react-native-firebase/app';
import {
  getMessaging,
  setBackgroundMessageHandler,
} from '@react-native-firebase/messaging';
import App from './App';
import {name as appName} from './app.json';

const app = getApp();
const messagingInstance = getMessaging(app);

setBackgroundMessageHandler(messagingInstance, async remoteMessage => {
  console.log('백그라운드 메시지 수신:', remoteMessage);
});


AppRegistry.registerComponent(appName, () => App);