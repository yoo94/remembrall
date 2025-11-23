import {
  UseMutationOptions,
  UseQueryOptions,
  QueryKey,
} from '@tanstack/react-query';
import {AxiosError} from 'axios';

type ResponseError = AxiosError<{
  message: string;
  statusCode: number;
  error: string;
}>;

type UseMutationCustomOptions<TouchData = unknown, TVariables = unknown> = Omit<
  UseMutationOptions<TouchData, Error, TVariables, unknown>,
  'mutationFn'
>;

type UseQueryCustomOptions<TQuerytData = unknown, Tdata = TQuerytData> = Omit<
  UseQueryOptions<TQuerytData, ResponseError, Tdata, QueryKey>,
  'queryKey'
>;

export type {ResponseError, UseMutationCustomOptions, UseQueryCustomOptions};
