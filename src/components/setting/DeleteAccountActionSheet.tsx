import React from 'react';
import {Alert} from 'react-native';
import {ActionSheet} from '../common/ActionSheet';
import useAuth from '@/hooks/queries/useAuth';
import Toast from 'react-native-toast-message';

interface DeleteAccountActionSheetProps {
  isVisible: boolean;
  hideAction: () => void;
}

function DeleteAccountActionSheet({
  isVisible,
  hideAction,
}: DeleteAccountActionSheetProps) {
  const {deleteAccountMutation} = useAuth();

  const handleDeleteAccount = () => {
    Alert.alert(
      '계정 삭제',
      '정말로 계정을 삭제하시겠습니까?\n모든 데이터가 영구 삭제됩니다.',
      [
        {text: '취소', onPress: () => {}},
        {
          text: '삭제',
          onPress: () => {
            deleteAccountMutation.mutate(null, {
              onSuccess: () => {
                hideAction();
                Toast.show({
                  type: 'success',
                  text1: '계정이 삭제되었습니다',
                });
              },
            });
          },
          style: 'destructive',
        },
      ],
    );
  };

  return (
    <ActionSheet isVisible={isVisible} hideAction={hideAction}>
      <ActionSheet.Title>계정 삭제</ActionSheet.Title>
      <ActionSheet.Divider />
      <ActionSheet.Button isDanger onPress={handleDeleteAccount}>
        계정 삭제
      </ActionSheet.Button>
      <ActionSheet.Button onPress={hideAction}>취소</ActionSheet.Button>
    </ActionSheet>
  );
}

export default DeleteAccountActionSheet;