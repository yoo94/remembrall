import CustomButton from '@/components/CustomButton';
import InputField from '@/components/InputField';
import useForm from '@/hooks/useForm';
import useGetAddress from '@/hooks/useGetAddress';
import {MapStackParamList} from '@/types/navigation';
import {validateAddPost} from '@/utils/validation';
import {StackScreenProps} from '@react-navigation/stack';
import React from 'react';
import {ScrollView, StyleSheet, View} from 'react-native';

type AddLocationScreenProps = StackScreenProps<
  MapStackParamList,
  'AddLocation'
>;

function AddLocationScreen({route}: AddLocationScreenProps) {
  const {location} = route.params;
  const address = useGetAddress(location); // 주소 정보를 받아옴

  const postForm = useForm({
    initialValue: {
      title: '',
      description: '',
      date: new Date(),
      location: location,
    },
    validate: validateAddPost,
  });

  return (
    <ScrollView style={styles.container}>
      <View style={styles.contentContainer}>
        {/* 주소 표시 InputField */}
        <InputField
          value={address}
          disabled
          icon="location"
          placeholder="주소"
        />

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
          error={postForm.errors.description}
          touched={postForm.touched.description}
          {...postForm.getTextInputProps('description')}
        />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  contentContainer: {
    padding: 20,
    gap: 20, // View에서는 gap 사용 가능
  },
});

export default AddLocationScreen;
