interface ImageUri {
  id?: number;
  uri: string;
}

interface Marker {
  id: number;
  latitude: number;
  longitude: number;
  color: string;
  score: number;
  meter?: string;
  title?: string;
}

interface MarkerResponse {
  markers: Marker[];
  notifiedPostIds: string[];
}

interface Post extends Marker {
  title: string;
  address: string;
  date: Date | string;
  description: string;
  imageUris: ImageUri[];
  meter: string;
  isFavorite?: boolean;
}

interface Profile {
  id: number;
  email: string;
  nickname: string | null;
  imageUri: string | null;
  loginType: 'email' | 'kakao' | 'apple';
}

export type {ImageUri, Marker, MarkerResponse, Post, Profile};