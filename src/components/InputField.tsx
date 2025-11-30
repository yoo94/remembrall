import {colors} from '@/constants/colors';
import React from 'react';
import {StyleSheet, Text, TextInput, TextInputProps, View} from 'react-native';

interface InputFieldProps extends TextInputProps {
  error?: string;
  touched?: boolean;
  ref?: React.Ref<TextInput>;
}

function InputField({error, touched, ...props}: InputFieldProps) {
  return (
    <View>
      <TextInput
        ref={props.ref}
        placeholderTextColor={colors.GRAY_500}
        spellCheck={false}
        autoCorrect={false}
        autoCapitalize="none"
        style={[
          styles.input,
          props.multiline && styles.multiline,
          touched && Boolean(error) && styles.inputError,
        ]}
        {...props}
      />
      {touched && Boolean(error) && <Text style={styles.error}>{error}</Text>}
    </View>
  );
}

const styles = StyleSheet.create({
  input: {
    borderWidth: 1,
    borderColor: colors.GRAY_200,
    justifyContent: 'center',
    height: 50,
    paddingHorizontal: 10,
    fontSize: 16,
    color: colors.BLACK,
  },
  inputError: {
    borderWidth: 1,
    borderColor: colors.RED_300,
  },
  error: {
    color: colors.RED_500,
    fontSize: 12,
    paddingTop: 5,
  },
  multiline: {
    height: 150,
    paddingVertical: 10,
    textAlignVertical: 'top',
  },
});

export default InputField;
