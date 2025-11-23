import {
  getAccessToken,
  getProfile,
  postLogin,
  postSignup,
  logout,
} from '@/api/auth';
import queryClient from '@/api/queryClient';
import {numbers} from '@/constants/numbers';
import {UseMutationCustomOptions, UseQueryCustomOptions} from '@/types/api';
import {Profile} from '@/types/domain';
import {removeEncryptStorage, setEncryptStorage} from '@/utils/encryptStorage';
import {removeHeader, setHeader} from '@/utils/header';
import {useMutation, useQuery} from '@tanstack/react-query';
import {useEffect} from 'react';
import {storageKeys, queryKeys} from '@/constants/keys';

function useSignup(mutationOptions?: UseMutationCustomOptions) {
  return useMutation({
    mutationFn: postSignup,
    ...mutationOptions,
  });
}

function useLogin(mutationOptions?: UseMutationCustomOptions) {
  return useMutation({
    mutationFn: postLogin,
    onSuccess: async ({accessToken, refreshToken}) => {
      setHeader('Authorization', `Bearer ${accessToken}`);
      await setEncryptStorage(storageKeys.REFRESH_TOKEN, refreshToken);
      // 프로필 데이터 미리 가져오기 (prefetch)
      queryClient.fetchQuery({
        queryKey: [queryKeys.AUTH, queryKeys.GET_PROFILE],
        queryFn: getProfile,
      });
    },
    ...mutationOptions,
  });
}

function useGetRefreshToken() {
  const {data, isSuccess, isError} = useQuery({
    queryKey: [queryKeys.AUTH, queryKeys.GET_ACCESS_TOKEN], // 캐싱을 위한 키
    queryFn: getAccessToken,
    staleTime: numbers.ACCESS_TOKEN_REFRESH_TIME, // 토큰 캐싱 시간
    refetchInterval: numbers.ACCESS_TOKEN_REFRESH_TIME, // 토큰 갱신 주기
  });

  useEffect(() => {
    async () => {
      if (isSuccess && data) {
        setHeader('Authorization', `Bearer ${data.accessToken}`);
        await setEncryptStorage(storageKeys.REFRESH_TOKEN, data.refreshToken);
      }
    };
  }, [isSuccess, data]);

  useEffect(() => {
    if (isError) {
      removeHeader('Authorization');
      removeEncryptStorage(storageKeys.REFRESH_TOKEN);
    }
  }, [isError]);

  return {isSuccess, isError};
}

function useGetProfile(queryOptions?: UseQueryCustomOptions<Profile>) {
  return useQuery({
    queryFn: getProfile,
    queryKey: [queryKeys.AUTH, queryKeys.GET_PROFILE],
    ...queryOptions,
  });
}

function useLogOut(mutationOptions?: UseMutationCustomOptions) {
  return useMutation({
    mutationFn: logout,
    onSuccess: async () => {
      removeHeader('Authorization');
      await removeEncryptStorage(storageKeys.REFRESH_TOKEN);
      queryClient.resetQueries({queryKey: [queryKeys.AUTH]});
    },
    ...mutationOptions,
  });
}

function useAuth() {
  const signupMutation = useSignup();
  const loginMutation = useLogin();
  const refreshTokenQuery = useGetRefreshToken();
  const {data, isSuccess: isLogin} = useGetProfile({
    enabled: refreshTokenQuery.isSuccess, // 리프레시 토큰이 불러오기가 성공 때만 프로필 조회
  });
  const logoutMutation = useLogOut();
  return {
    signupMutation,
    loginMutation,
    isLogin,
    userInfo: {
      id: data?.id || '',
      email: data?.email || '',
      nickname: data?.nickname || '',
      imageUri: data?.imageUri || '',
    },
    logoutMutation,
  };
}

export default useAuth;
