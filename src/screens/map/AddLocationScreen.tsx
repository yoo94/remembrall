import CustomButton from '@/components/CustomButton';
import InputField from '@/components/InputField';
import useForm from '@/hooks/useForm';
import {MapStackParamList} from '@/types/navigation';
import {validateAddPost} from '@/utils/validation';
import {StackScreenProps} from '@react-navigation/stack';
import React from 'react';
import {ScrollView, StyleSheet} from 'react-native';

type AddLocationScreenProps = StackScreenProps<
  MapStackParamList,
  'AddLocation'
>;

function AddLocationScreen({route}: AddLocationScreenProps) {
  const {location} = route.params;
  const postForm = useForm({
    initialValue: {
      title: '',
      content: '',
      date: new Date(),
      location: location,
    },
    validate: validateAddPost,
  });
  return (
    <ScrollView style={styles.container}>
      <InputField />
      <CustomButton variant="outlined" label="날짜선택" onPress={() => {}} />
      <InputField
        placeholder="제목을 입력하세요"
        error={postForm.errors.title}
        touched={postForm.touched.title}
        {...postForm.getTextInputProps('title')}
      />
      <InputField
        placeholder="상세히 기억할 내용을 입력하세요 (선택)"
        multiline
        {...postForm.getTextInputProps('content')}
      />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    gap: 20,
    padding: 20,
    backgroundColor: 'white',
  },
});

export default AddLocationScreen;
