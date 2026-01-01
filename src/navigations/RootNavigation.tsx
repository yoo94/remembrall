import useAuth from '@/hooks/queries/useAuth';
import DrawerNavigation from './DrawerNavigation';
import RetryErrorBoundary from '@/components/common/RetryErrorBoundary';
import AuthNavigation from './AuthNavigation';
import {NavigationContainer} from '@react-navigation/native';
import {navigationRef} from './navigationRef';

function RootNavigation() {
  const {isLogin} = useAuth();

  return (
    <RetryErrorBoundary>
      <NavigationContainer ref={navigationRef}>
        {isLogin ? <DrawerNavigation /> : <AuthNavigation />}
      </NavigationContainer>
    </RetryErrorBoundary>
  );
}

export default RootNavigation;
