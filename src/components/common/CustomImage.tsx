import React, {useState} from 'react';
import {Image, Platform, ActivityIndicator, View} from 'react-native';
import {baseUrls} from '@/api/axios';

interface CustomImageProps {
  uri: string;
  imageStyle?: object;
  resizeMode?: string;
}

function CustomImage({uri, imageStyle, resizeMode}: CustomImageProps) {
  const [isLoading, setIsLoading] = useState(true);

  return (
    <View style={imageStyle}>
      {isLoading && (
        <ActivityIndicator
          size="large"
          color="#999"
          style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            marginLeft: -20,
            marginTop: -20,
            zIndex: 1,
          }}
        />
      )}
      <Image
        style={imageStyle}
        source={{
          uri: `${
            Platform.OS === 'ios' ? baseUrls.ios : baseUrls.android
          }/uploads/${uri}`,
        }}
        resizeMode={resizeMode}
        onLoadEnd={() => setIsLoading(false)}
      />
    </View>
  );
}

export default CustomImage;