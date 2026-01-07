import {useState} from 'react';
import ImagePicker from 'react-native-image-crop-picker';
import Toast from 'react-native-toast-message';

import useMutateImages from '@/hooks/queries/useMutateImages';
import getFormDataImages from '@/utils/image';
import {ImageUri} from '@/types/domain';

interface UseImagePickerProps {
  initialImages: ImageUri[];
}

function useImagePicker({initialImages}: UseImagePickerProps) {
  const uploadImages = useMutateImages();
  const [imageUris, setImageUris] = useState<ImageUri[]>(initialImages);
  const [isUploading, setIsUploading] = useState(false);

  const addImageUris = (uris: string[]) => {
    setImageUris(prev => [...prev, ...uris.map(uri => ({uri}))]);
  };

  const deleteImageUri = (uri: string) => {
    const newImageUris = imageUris.filter(image => image.uri !== uri);
    setImageUris(newImageUris);
  };

  const handleChangeImage = () => {
    ImagePicker.openPicker({
      mediaType: 'photo',
      multiple: true,
      includeBase64: true,
      maxFiles: 3,
    })
      .then(images => {
        setIsUploading(true); // ← 업로드 시작
        const formData = getFormDataImages('images', images);
        uploadImages.mutate(formData, {
          onSuccess: data => {
            addImageUris(data);
            setIsUploading(false); // ← 업로드 완료
          },
          onError: () => {
            setIsUploading(false); // ← 에러 시에도 해제
          },
        });
      })
      .catch(error => {
        if (error.code !== 'E_PICKER_CANCELLED') {
          Toast.show({
            type: 'error',
            text1: '권한을 허용했는지 확인해주세요.',
            position: 'bottom',
          });
        }
      });
  };

  return {imageUris, handleChangeImage, delete: deleteImageUri, isUploading};
}

export default useImagePicker;