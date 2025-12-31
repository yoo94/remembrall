import React, {useState} from 'react';
import {ScrollView, StyleSheet, View} from 'react-native';
import {StackScreenProps} from '@react-navigation/stack';
import {useNavigation} from '@react-navigation/native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import DatePicker from 'react-native-date-picker';
import Toast from 'react-native-toast-message';

import {FeedStackParamList} from '@/types/navigation';
import useGetPost from '@/hooks/queries/useGetPost';
import useForm from '@/hooks/useForm';
import {validateAddPost} from '@/utils/validation';
import InputNumberField from '@/components/common/InputNumberField';
import useGetAddress from '@/hooks/useGetAddress';
import useImagePicker from '@/hooks/useImagePicker';
import InputField from '@/components/common/InputField';
import CustomButton from '@/components/common/CustomButton';
import {getDateTimeWithSeparator} from '@/utils/date';
import MarkerColorInput from '@/components/post/MarkerColorInput';
import ScoreInput from '@/components/post/ScoreInput';
import ImageInput from '@/components/post/ImageInput';
import PreviewImageList from '@/components/common/PreviewImageList';
import FixedBottomCTA from '@/components/common/FixedBottomCTA';
import useMutateUpdatePost from '@/hooks/queries/useMutateUpdatePost';

type Props = StackScreenProps<FeedStackParamList, 'EditLocation'>;

function EditLocationScreen({route}: Props) {
  const {id} = route.params;
  const {data: post} = useGetPost(id);
  const navigation = useNavigation();
  const inset = useSafeAreaInsets();
  const postForm = useForm({
    initialValue: {
      title: post?.title ?? '',
      description: post?.description ?? '',
      score: post?.score ?? 3,
      date: post?.date ? new Date(post.date) : new Date(),
      meter: post?.meter ?? '',
      color: post?.color ?? '',
    },
    validate: validateAddPost,
  });
  const [openDate, setOpenDate] = useState(false);
  const address = useGetAddress({
    latitude: post?.latitude as number,
    longitude: post?.longitude as number,
  });
  const imagePicker = useImagePicker({initialImages: post?.imageUris ?? []});
  const updatePost = useMutateUpdatePost();

  const handleSubmit = () => {
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

    updatePost.mutate(
      {
        id,
        body: {
          ...postForm.values,
          imageUris: imagePicker.imageUris,
        },
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

export default EditLocationScreen;
