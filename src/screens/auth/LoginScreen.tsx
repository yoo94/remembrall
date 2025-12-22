import React, {useRef} from 'react';
import {
  ActivityIndicator,
  Modal,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';

import CustomButton from '@/components/common/CustomButton';
import InputField from '@/components/common/InputField';
import useForm from '@/hooks/useForm';
import {validateLogin} from '@/utils/validation';
import useAuth from '@/hooks/queries/useAuth';
import Toast from 'react-native-toast-message';
import {errorMessages} from '@/constants/messages';
import {colors} from '@/constants/colors';

function LoginScreen() {
  const {loginMutation} = useAuth();
  const passwordRef = useRef<TextInput | null>(null);
  const login = useForm({
    initialValue: {email: '', password: ''},
    validate: validateLogin,
  });

  const handleSubmit = () => {
    loginMutation.mutate(login.values, {
      onError: error =>
        Toast.show({
          type: 'error',
          text1: error.response?.data.message || errorMessages.UNEXPECT_ERROR,
        }),
    });
  };

  return (
    <>
      <SafeAreaView style={styles.container}>
        <View style={styles.inputContainer}>
          <InputField
            autoFocus
            placeholder="이메일"
            submitBehavior="submit"
            returnKeyType="next"
            inputMode="email"
            onSubmitEditing={() => passwordRef.current?.focus()}
            touched={login.touched.email}
            error={login.errors.email}
            {...login.getTextInputProps('email')}
          />
          <InputField
            ref={passwordRef}
            secureTextEntry
            textContentType="oneTimeCode"
            placeholder="비밀번호"
            returnKeyType="join"
            maxLength={20}
            onSubmitEditing={handleSubmit}
            touched={login.touched.password}
            error={login.errors.password}
            {...login.getTextInputProps('password')}
          />
        </View>
        <CustomButton
          label="로그인"
          variant="filled"
          size="large"
          onPress={handleSubmit}
        />
      </SafeAreaView>

      {/* 로딩 오버레이 */}
      <Modal visible={loginMutation.isPending} transparent animationType="fade">
        <View style={styles.modalBackground}>
          <View style={styles.loadingContainer}>
            <ActivityIndicator size="large" color={colors.light.BLUE_500} />
            <Text style={styles.loadingText}>로그인 중입니다...</Text>
          </View>
        </View>
      </Modal>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin: 30,
  },
  inputContainer: {
    gap: 20,
    marginBottom: 30,
  },
  modalBackground: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingContainer: {
    backgroundColor: 'white',
    padding: 30,
    borderRadius: 10,
    alignItems: 'center',
    gap: 15,
  },
  loadingText: {
    fontSize: 16,
    color: colors.light.GRAY_700,
  },
});

export default LoginScreen;