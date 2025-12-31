import {colors} from '@/constants/colors';
import useThemeStore, {Theme} from '@/store/theme';
import React, {Ref} from 'react';
import {StyleSheet, Text, TextInput, TextInputProps, View} from 'react-native';

interface InputNumberFieldProps extends Omit<TextInputProps, 'onChangeText' | 'keyboardType' | 'value'> {
  ref?: Ref<TextInput>;
  error?: string;
  touched?: boolean;
  disabled?: boolean;
  value?: string;
  onChangeText?: (text: string) => void;
}

function formatNumberWithComma(num: string) {
  if (!num) return '';
  // 0으로 시작하는 경우 0만 허용
  if (/^0+$/.test(num)) return '0';
  // 숫자만 쉼표
  return parseInt(num, 10).toLocaleString();
}

function InputNumberField({
  ref,
  error,
  touched,
  disabled = false,
  value = '',
  onChangeText,
  ...props
}: InputNumberFieldProps) {
  const {theme} = useThemeStore();
  const styles = styling(theme);

  // 숫자만 입력되도록 처리 + 쉼표 표시
  const handleChangeText = (text: string) => {
  const onlyNumber = text.replace(/[^0-9]/g, '');
  // 1000 초과 입력 방지
  if (onlyNumber === '') {
    onChangeText?.('');
    return;
  }
  const num = parseInt(onlyNumber, 10);
  if (num > 1000) {
    onChangeText?.('1000');
  } else {
    onChangeText?.(onlyNumber);
  }
};

  // 쉼표가 포함된 표시용 값
  const displayValue = value ? formatNumberWithComma(value) : '';

  return (
    <View>
      <View style={styles.row}>
        <TextInput
          ref={ref}
          placeholderTextColor={colors[theme].GRAY_500}
          autoCapitalize="none"
          spellCheck={false}
          autoCorrect={false}
          style={[
            styles.input,
            styles.rightAlign,
            disabled && styles.disabled,
            props.multiline && styles.multiLine,
            touched && Boolean(error) && styles.inputError,
          ]}
          editable={!disabled}
          keyboardType="number-pad"
          value={displayValue}
          onChangeText={handleChangeText}
          {...props}
        />
        <Text style={styles.unit}>m</Text>
      </View>
      {touched && Boolean(error) && <Text style={styles.error}>{error}</Text>}
    </View>
  );
}

const styling = (theme: Theme) =>
  StyleSheet.create({
    row: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    input: {
      flex: 1,
      borderWidth: 1,
      borderColor: colors[theme].GRAY_200,
      justifyContent: 'center',
      height: 50,
      paddingHorizontal: 10,
      fontSize: 16,
      color: colors[theme].BLACK,
    },
    rightAlign: {
      textAlign: 'right',
    },
    unit: {
      marginLeft: 8,
      fontSize: 16,
      color: colors[theme].BLACK,
    },
    multiLine: {
      height: 150,
      paddingVertical: 10,
      textAlignVertical: 'top',
    },
    inputError: {
      borderWidth: 1,
      borderColor: colors[theme].RED_300,
    },
    error: {
      color: colors[theme].RED_500,
      fontSize: 12,
      paddingTop: 5,
    },
    disabled: {
      backgroundColor: colors[theme].GRAY_200,
      color: colors[theme].GRAY_700,
    },
  });

export default InputNumberField;