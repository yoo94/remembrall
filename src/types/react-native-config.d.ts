declare module 'react-native-config' {
  export interface NativeConfig {
    KAKAO_SECRET_KEY: string;
    KAKAO_REST_API_KEY: string;
    GOOGLE_MAPS_API_KEY?: string;
  }

  export const Config: NativeConfig;
  export default Config;
}
