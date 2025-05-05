import { createApi } from '@reduxjs/toolkit/query/react';
import { baseQuery, baseQueryWithReauth } from './base.query';
import { CreateUserRequest, CreateUserResponse, IUser } from '@/types/user.type';
import { ApiResponse } from '@/types/base.type';
import { UserFormData } from '@/schema/user.schema';

export enum UserTags {
  USER = 'User',
  USERS = 'Users',
}

export const userApi = createApi({
  reducerPath: 'userApi',
  baseQuery: baseQueryWithReauth,
  tagTypes: Object.values(UserTags),
  endpoints: (builder) => ({
    createUser: builder.mutation<CreateUserResponse, UserFormData>({
      query: (userData) => ({
        url: 'users',
        method: 'POST',
        body: userData,
      }),
      invalidatesTags: [UserTags.USERS],
    }),
    updateUser: builder.mutation<CreateUserResponse, { userId: string; userData: Partial<CreateUserRequest> }>({
      query: ({ userId, userData }) => ({
        url: `users/${userId}`,
        method: 'PATCH',
        body: userData,
      }),
      invalidatesTags: (_, error, { userId }) => [{ type: UserTags.USER, id: userId }, UserTags.USERS],
    }),
    deleteUser: builder.mutation<any, string>({
      query: (userId) => ({
        url: `users/${userId}`,
        method: 'DELETE',
      }),
      invalidatesTags: (_, error, userId) => [{ type: UserTags.USER, id: userId }, UserTags.USERS],
    }),
    getUser: builder.query<ApiResponse<{data: IUser}>, string>({
      query: (userId) => ({
        url: `users/${userId}`,
        method: 'GET',
      }),
      providesTags: (result, error, userId) => [{ type: UserTags.USER, id: userId }, UserTags.USERS],
    }),
    getUsers: builder.query<ApiResponse<IUser[]>, string>({
      query: (params) => {
        const queryString = new URLSearchParams(params).toString();
        return {
          url: `users?${queryString}`,
          method: 'GET',
        };
      },
      providesTags: [UserTags.USERS],
    }),
    currentUser: builder.query<CreateUserResponse, void>({
      query: () => ({
        url: 'users/account/current-user',
        method: 'GET',
      }),
      
      providesTags: (result, error) => [{ type: UserTags.USER, id: result?.data.id }, UserTags.USERS], 
    }),
  }),
});

export const { useCreateUserMutation,useCurrentUserQuery, useUpdateUserMutation, useDeleteUserMutation, useGetUserQuery, useGetUsersQuery } = userApi;

