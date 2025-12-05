import {useState} from 'react';
import {ScrollView, StyleSheet, View} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {useNavigation} from '@react-navigation/native';
import {StackScreenProps} from '@react-navigation/stack';
import DatePicker from 'react-native-date-picker';

import CustomButton from '@/components/common/CustomButton';
import InputField from '@/components/common/InputField';
import MarkerColorInput from '@/components/post/MarkerColorInput';
import ScoreInput from '@/components/post/ScoreInput';
import ImageInput from '@/components/post/ImageInput';
import PreviewImageList from '@/components/PreviewImageList';
import FixBottomCTA from '@/components/common/FixBottomCTA';

import useForm from '@/hooks/useForm';
import useGetAddress from '@/hooks/useGetAddress';
import useImagePicker from '@/hooks/useImagePicker';
import usePermission from '@/hooks/usePermission';
import useMutateCreatePost from '@/hooks/queries/useMutateCreatePost';

import {MapStackParamList} from '@/types/navigation';
import {validateAddPost} from '@/utils/validation';
import {getDateTimeWithSeparator} from '@/utils/date';
import {colors} from '@/constants/colors';

type AddLocationScreenProps = StackScreenProps<
  MapStackParamList,
  'AddLocation'
>;

function AddLocationScreen({route}: AddLocationScreenProps) {
  usePermission('PHOTO');

  const inset = useSafeAreaInsets();
  const {location} = route.params;
  const address = useGetAddress(location); // 주소 정보를 받아옴
  const [openDate, setOpenDate] = useState(false);
  const {handleChangeImage, deleteImageUri, imageUris} = useImagePicker();
  const createPost = useMutateCreatePost();
  const navigation = useNavigation();
  const postForm = useForm({
    initialValue: {
      title: '',
      description: '',
      date: new Date(),
      color: colors.PINK_400,
      score: 3,
    },
    validate: validateAddPost,
  });
  const handleSubmit = async () => {
    createPost.mutate(
      {
        ...postForm.values,
        ...location,
        address,
        imageUris,
      },
      {
        onSuccess: () => navigation.goBack(),
      },
    );
  };

  return (
    <>
      <ScrollView
        style={[styles.container, {paddingBottom: inset.bottom + 100}]}>
        <View style={styles.contentContainer}>
          {/* 주소 표시 InputField */}
          <InputField
            value={address}
            disabled
            icon="location"
            placeholder="주소"
          />

          <CustomButton
            variant="outlined"
            label={getDateTimeWithSeparator(postForm.values.date, '.')}
            onPress={() => setOpenDate(true)}
          />

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
          <MarkerColorInput
            color={postForm.values.color}
            onChangeColor={value => postForm.onChange('color', value)}
          />
          <ScoreInput
            score={postForm.values.score}
            onChangeScore={value => postForm.onChange('score', value)}
          />
          <DatePicker
            modal
            locale="ko"
            mode="datetime"
            title={null}
            date={postForm.values.date}
            open={openDate}
            cancelText="취소"
            confirmText="완료"
            onConfirm={date => {
              postForm.onChange('date', date);
              setOpenDate(false);
            }}
            onCancel={() => {
              setOpenDate(false);
            }}
          />
          <View style={styles.imageContainer}>
            <ImageInput onChange={handleChangeImage} />
            <PreviewImageList imageUris={imageUris} onDelete={deleteImageUri} />
          </View>
        </View>
      </ScrollView>
      <FixBottomCTA label="위치 저장하기" onPress={() => handleSubmit()} />
    </>
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
  imageContainer: {
    flexDirection: 'row',
    gap: 15,
  },
});

export default AddLocationScreen;
