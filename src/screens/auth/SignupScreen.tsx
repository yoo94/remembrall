import {useRef} from 'react';
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
import useAuth from '@/hooks/queries/useAuth';
import {validateSignup} from '@/utils/validation';
import Toast from 'react-native-toast-message';
import {errorMessages} from '@/constants/messages';
import {colors} from '@/constants/colors';

function SignupScreen() {
  const {signupMutation, loginMutation} = useAuth();
  const passwordRef = useRef<TextInput | null>(null);
  const passwordConfirmRef = useRef<TextInput | null>(null);
  const signup = useForm({
    initialValue: {email: '', password: '', passwordConfirm: ''},
    validate: validateSignup,
  });

  const handleSubmit = () => {
    const {email, password} = signup.values;

    signupMutation.mutate(
      {email, password},
      {
        onSuccess: () => loginMutation.mutate({email, password}),
        onError: error =>
          Toast.show({
            type: 'error',
            text1: error.response?.data.message || errorMessages.UNEXPECT_ERROR,
          }),
      },
    );
  };

  const isLoading = signupMutation.isPending || loginMutation.isPending;

  return (
    <>
      <SafeAreaView style={styles.container}>
        <View style={styles.inputContainer}>
          <InputField
            autoFocus
            placeholder="이메일"
            returnKeyType="next"
            inputMode="email"
            submitBehavior="submit"
            onSubmitEditing={() => passwordRef.current?.focus()}
            touched={signup.touched.email}
            error={signup.errors.email}
            {...signup.getTextInputProps('email')}
          />
          <InputField
            ref={passwordRef}
            secureTextEntry
            textContentType="oneTimeCode"
            placeholder="비밀번호"
            submitBehavior="submit"
            onSubmitEditing={() => passwordConfirmRef.current?.focus()}
            touched={signup.touched.password}
            error={signup.errors.password}
            {...signup.getTextInputProps('password')}
          />
          <InputField
            ref={passwordConfirmRef}
            secureTextEntry
            placeholder="비밀번호 확인"
            onSubmitEditing={handleSubmit}
            touched={signup.touched.passwordConfirm}
            error={signup.errors.passwordConfirm}
            {...signup.getTextInputProps('passwordConfirm')}
          />
        </View>
        <CustomButton
          label="회원가입"
          variant="filled"
          size="large"
          onPress={handleSubmit}
        />
      </SafeAreaView>

      {/* 로딩 오버레이 */}
      <Modal visible={isLoading} transparent animationType="fade">
        <View style={styles.modalBackground}>
          <View style={styles.loadingContainer}>
            <ActivityIndicator size="large" color={colors.light.BLUE_500} />
            <Text style={styles.loadingText}>
              {signupMutation.isPending
                ? '회원가입 중입니다...'
                : '로그인 중입니다...'}
            </Text>
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

export default SignupScreen;