import {createNavigationContainerRef} from '@react-navigation/native';
import {MainDrawerParamList} from '@/types/navigation';

export const navigationRef = createNavigationContainerRef<MainDrawerParamList>();

export function navigate(name: keyof MainDrawerParamList, params?: any) {
  if (navigationRef.isReady()) {
    navigationRef.navigate(name, params);
  }
}