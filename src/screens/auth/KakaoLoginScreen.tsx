import Indicator from '@/components/common/Indicator';
import useAuth from '@/hooks/queries/useAuth';
import axios from 'axios';
import React, {useState} from 'react';
import {StyleSheet, View} from 'react-native';
import Config from 'react-native-config';
import {SafeAreaView} from 'react-native-safe-area-context';
import WebView, {WebViewNavigation} from 'react-native-webview';

const REDIRECT_URI = `https://remembrall-server.onrender.com/auth/oauth/kakao`;

function KakaoLoginScreen() {
  const {kakaoLoginMutation} = useAuth();
  const [isChangeUrl, setIsChangeUrl] = useState(true);
  const [isLoading, setIsLoading] = useState(false);

  const requestToken = async (code: string) => {
  try {
    console.log('Authorization code:', code);
    
    const response = await axios({
      method: 'post',
      url: 'https://kauth.kakao.com/oauth/token',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8',
      },
      data: new URLSearchParams({
        grant_type: 'authorization_code',
        client_id: Config.KAKAO_REST_API_KEY,
        redirect_uri: REDIRECT_URI,
        client_secret: Config.KAKAO_SECRET_KEY,
        code,
      }).toString(),
    });

    console.log('Token response:', response.data);
    kakaoLoginMutation.mutate(response.data.access_token);
  } catch (error: any) {
    console.error('Token request error:', error);
    console.error('Error response:', error.response?.data);
   
  }
};

  const handleOnMessage = (event: any) => {
    if (event.nativeEvent.url.includes(`${REDIRECT_URI}?code=`)) {
      const code = event.nativeEvent.url.replace(`${REDIRECT_URI}?code=`, '');
      requestToken(code);
    }
  };

  const handleNavigationStateChange = (event: WebViewNavigation) => {
    const isMatched = event.url.includes(`${REDIRECT_URI}?code=`);
    
    if (isMatched) {
      const code = event.url.replace(`${REDIRECT_URI}?code=`, '');
      setIsChangeUrl(false);
      setIsLoading(true);
      requestToken(code);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      {isLoading && (
        <View style={styles.loadingContainer}>
          <Indicator size="large" />
        </View>
      )}
      {isChangeUrl && (
        <WebView
          style={styles.container}
          source={{
            uri: `https://kauth.kakao.com/oauth/authorize?response_type=code&client_id=${Config.KAKAO_REST_API_KEY}&redirect_uri=${REDIRECT_URI}`,
          }}
          onNavigationStateChange={handleNavigationStateChange}
          injectedJavaScript="window.ReactNativeWebView.postMessage('')"
          onMessage={handleOnMessage}
        />
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default KakaoLoginScreen;