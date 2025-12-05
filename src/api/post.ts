import {ImageUri, Post} from '@/types/domain';
import {axiosInstance} from './axios';

export type ResponsePost = Post & {images: ImageUri[]};

//피드 리스트
const getPosts = async (page = 1): Promise<ResponsePost[]> => {
  const {data} = await axiosInstance.get(`/posts?page=${page}`);

  return data;
};

type RequestCreatePost = Omit<Post, 'id'> & {imageUris: ImageUri[]};

//포스팅
const createPost = async (body: RequestCreatePost): Promise<ResponsePost> => {
  const {data} = await axiosInstance.post('/posts', body);

  return data;
};

export type ResponseSinglePost = ResponsePost & {isFavorite: boolean};
//하나만 가져오는거 모달이나 디테일
const getPost = async (id: number): Promise<ResponseSinglePost> => {
  const {data} = await axiosInstance.get(`/posts/${id}`);

  return data;
};

export {createPost, getPost, getPosts};
