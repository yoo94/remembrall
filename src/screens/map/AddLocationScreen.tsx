import React, {useState} from 'react';
import {ScrollView, StyleSheet, View} from 'react-native';
import {StackScreenProps} from '@react-navigation/stack';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import DatePicker from 'react-native-date-picker';
import Toast from 'react-native-toast-message';

import InputField from '@/components/common/InputField';
import InputNumberField from '@/components/common/InputNumberField';
import CustomButton from '@/components/common/CustomButton';
import MarkerColorInput from '@/components/post/MarkerColorInput';
import ScoreInput from '@/components/post/ScoreInput';
import FixedBottomCTA from '@/components/common/FixedBottomCTA';
import useForm from '@/hooks/useForm';
import useGetAddress from '@/hooks/useGetAddress';
import {colors} from '@/constants/colors';
import {validateAddPost} from '@/utils/validation';
import {getDateTimeWithSeparator} from '@/utils/date';
import {MapStackParamList} from '@/types/navigation';
import ImageInput from '@/components/post/ImageInput';
import usePermission from '@/hooks/usePermission';
import useImagePicker from '@/hooks/useImagePicker';
import PreviewImageList from '@/components/common/PreviewImageList';
import useMutateCreatePost from '@/hooks/queries/useMutateCreatePost';
import {useNavigation} from '@react-navigation/native';

type Props = StackScreenProps<MapStackParamList, 'AddLocation'>;

function AddLocationScreen({route}: Props) {
  const {location} = route.params;
  const navigation = useNavigation();
  const inset = useSafeAreaInsets();
  const address = useGetAddress(location);
  const imagePicker = useImagePicker({initialImages: []});
  const postForm = useForm({
    initialValue: {
      title: '',
      description: '',
      date: new Date(),
      color: colors.light.PINK_400,
      score: 3,
      meter: '',
    },
    validate: validateAddPost,
  });
  const [openDate, setOpenDate] = useState(false);
  const createPost = useMutateCreatePost();
  usePermission('PHOTO');

  const handleSubmit = () => {
    // 필드별 체크
    if (!postForm.values.title.trim()) {
      Toast.show({
        type: 'error',
        text1: '제목을 입력해주세요.',
        position: 'bottom',
      });
      return;
    }
    if (!postForm.values.color) {
      Toast.show({
        type: 'error',
        text1: '마커 색상을 선택해주세요.',
        position: 'bottom',
      });
      return;
    }
    const onlyNumber = postForm.values.meter.replace(/[^0-9]/g, '');
    const num = parseInt(onlyNumber, 10);
    if (isNaN(num) || num < 50 || num > 500) {
      Toast.show({
        type: 'error',
        text1: '알림 거리는 50~500 사이의 숫자여야 합니다.',
        position: 'bottom',
      });
      return;
    }

    createPost.mutate(
      {
        address,
        ...location,
        ...postForm.values,
        imageUris: imagePicker.imageUris,
      },
      {
        onSuccess: () => navigation.goBack(),
      },
    );
  };

  return (
    <>
      <ScrollView
        contentContainerStyle={[
          styles.container,
          {paddingBottom: inset.bottom + 100},
        ]}>
        <InputField disabled value={address} />
        <CustomButton
          variant="outlined"
          label={getDateTimeWithSeparator(postForm.values.date, '. ')}
          onPress={() => setOpenDate(true)}
        />
        <InputField
          placeholder="제목을 입력하세요."
          error={postForm.errors.title}
          touched={postForm.touched.title}
          {...postForm.getTextInputProps('title')}
        />
        <InputField
          multiline
          placeholder="기록하고 싶은 내용을 입력하세요. (선택)"
          error={postForm.errors.description}
          touched={postForm.touched.description}
          {...postForm.getTextInputProps('description')}
        />
        <MarkerColorInput
          color={postForm.values.color}
          score={postForm.values.score}
          onChangeColor={value => postForm.onChange('color', value)}
        />
        <ScoreInput
          score={postForm.values.score}
          onChangeScore={value => postForm.onChange('score', value)}
        />
        <InputNumberField
          placeholder="알림이 울릴 메모와의 거리를 입력해주세요."
          value={postForm.values.meter}
          onChangeText={text => postForm.onChange('meter', text)}
        />
        <DatePicker
          modal
          locale="ko"
          mode="date"
          title={null}
          cancelText="취소"
          confirmText="완료"
          date={postForm.values.date}
          open={openDate}
          onConfirm={date => {
            postForm.onChange('date', date);
            setOpenDate(false);
          }}
          onCancel={() => setOpenDate(false)}
        />
        <View style={{flexDirection: 'row'}}>
          <ImageInput onChange={imagePicker.handleChangeImage} />
          <PreviewImageList
            imageUris={imagePicker.imageUris}
            onDelete={imagePicker.delete}
            showDeleteButton
          />
        </View>
      </ScrollView>
      <FixedBottomCTA label="저장" onPress={handleSubmit} />
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    gap: 20,
    padding: 20,
  },
});

export default AddLocationScreen;