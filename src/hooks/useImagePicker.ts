
import getFormDataImages from '@/utils/image';
import useMutateImages from '@/hooks/queries/useMutateImages';
import ImagePicker from 'react-native-image-crop-picker';
import {ImageUri} from '@/types/domain';
import {useState} from 'react';
import Toast from 'react-native-toast-message';

function useImagePicker() {
    const uploadImages = useMutateImages();
    const [imageUris,setImageUris] = useState<ImageUri[]>([])

    const addImageUris = (uris:string[]) =>{
        setImageUris(prev=>[...prev, ...uris.map(uri=>({uri}))])
    }
    const deleteImageUri = (uri:string) =>{
        setImageUris(prev=>prev.filter(imageUri=>imageUri.uri !== uri))
    }
    const handleChangeImage = () => {
        ImagePicker.openPicker({
          mediaType: 'photo',
          multiple: true,
          includeBase64: true,
          maxFiles: 2,
        }).then(images => {
          console.log('성공',images);
          const formData = getFormDataImages('images', images);
          uploadImages.mutate(formData, {
            onSuccess: data => {
              addImageUris(data);
            }
          });
        }).catch(error => {
          console.log(error);
          if(error.code !== 'E_PICKER_CANCELLED'){
            Toast.show({
              type: 'error',
              text1: '사진 접근 권한이 없습니다.',
              text2: '설정에서 사진 접근 권한을 허용해주세요.',
              position: 'bottom'
            });
          }
        });
      };
      return {handleChangeImage, imageUris,deleteImageUri};
}

export default useImagePicker;