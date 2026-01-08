import DrawerButton from '@/components/common/DrawerButton';
import {colors} from '@/constants/colors';
import EditProfileScreen from '@/screens/setting/EditProfileScreen';
import PrivacyPolicyScreen from '@/screens/setting/PrivacyPolicyScreen';
import SettingHomeScreen from '@/screens/setting/SettingHomeScreen';
import useThemeStore from '@/store/theme';
import {createStackNavigator} from '@react-navigation/stack';
import TermsOfServiceScreen from '@/screens/setting/TermsOfServiceScreen';
const Stack = createStackNavigator();

export function SettingStack() {
  const {theme} = useThemeStore();

  return (
    <Stack.Navigator
      screenOptions={{
        headerTitleAlign: 'center',
        headerBackButtonDisplayMode: 'minimal',
        headerTintColor: colors[theme].BLACK,
        headerStyle: {
          backgroundColor: colors[theme].WHITE,
          shadowColor: colors[theme].GRAY_500,
        },
        headerTitleStyle: {
          fontSize: 16,
        },
      }}>
      <Stack.Screen
        name="SettingHome"
        component={SettingHomeScreen}
        options={{
          title: '설정',
          headerLeft: () => <DrawerButton />,
          cardStyle: {
            backgroundColor: colors[theme].GRAY_100,
          },
        }}
      />
      <Stack.Screen
        name="EditProfile"
        component={EditProfileScreen}
        options={{
          title: '프로필 수정',
          cardStyle: {
            backgroundColor: colors[theme].WHITE,
          },
        }}
      />
      <Stack.Screen
        name="PrivacyPolicy"
        component={PrivacyPolicyScreen}
        options={{
          title: '개인정보 처리방침',
          cardStyle: {
            backgroundColor: colors[theme].WHITE,
          },
        }}
      />
      <Stack.Screen
        name="TermsOfService"
        component={TermsOfServiceScreen}
        options={{
          title: '서비스 이용약관',
          cardStyle: {
            backgroundColor: colors[theme].WHITE,
          },
        }}
      />
    </Stack.Navigator>
  );
}
