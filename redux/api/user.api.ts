import { createApi } from '@reduxjs/toolkit/query/react';
import { baseQueryWithReauth } from './base.query';
import { CreateUserRequest, CreateUserResponse, IUser, UpdatePasswordRequest, UpdateProfileRquest, VerifyUserRequest } from '@/types/user.type';
import { ApiResponse } from '@/types/base.type';
import { UserFormData } from '@/schema/user.schema';

export enum UserTags {
  USER = 'User',
  USERS = 'Users',
  CURRENT_USER = 'Current_User',
  VERIFICATION_REQUESTS = 'Verficication_Requests',
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
    updateProfile: builder.mutation<CreateUserResponse, UpdateProfileRquest>({
      query: (data) => ({
        url: `users/account/update-my-data`,
        method: 'PATCH',
        body: data,
      }),
      invalidatesTags: (_, error, {}) => {
        const token = localStorage.getItem('token') || '';
        return [{ type: UserTags.CURRENT_USER, id: token }];
      },
    }),
    updateProfilePricture: builder.mutation<CreateUserResponse, FormData>({
      query: (data) => ({
        url: `users/account/profile-picture`,
        method: 'PATCH',
        body: data,
      }),
      invalidatesTags: (_, error, {}) => {
        const token = localStorage.getItem('token') || '';
        return [{ type: UserTags.CURRENT_USER, id: token }];
      },
    }),
    updatePassword: builder.mutation<CreateUserResponse, UpdatePasswordRequest>({
      query: (data) => ({
        url: `users/account/password`,
        method: 'PATCH',
        body: data,
      }),
    }),
    completeOnBoadrding: builder.mutation<CreateUserResponse, FormData>({
      query: (data) => ({
        url: `users/account/complete-onboarding`,
        method: 'PATCH',
        body: data,
      }),
      invalidatesTags: [UserTags.CURRENT_USER, UserTags.VERIFICATION_REQUESTS, UserTags.USERS],
    }),
    requestAccountVerification: builder.mutation<CreateUserResponse, void>({
      query: () => ({
        url: `users/account/request-account-verification`,
        method: 'PATCH',
      }),
      invalidatesTags: [UserTags.VERIFICATION_REQUESTS, UserTags.CURRENT_USER],
    }),
    verifyUser: builder.mutation<CreateUserResponse, VerifyUserRequest>({
      query: (data) => ({
        url: `users/account/verify-user`,
        method: 'POST',
        body: data
      }),
      invalidatesTags: [UserTags.VERIFICATION_REQUESTS],
    }),
    getAllVerifications: builder.query<ApiResponse<{data:IUser[]}>, void>({
      query: () => ({
        url: 'users/account/verification-requests',
        method: 'GET',
      }),
      providesTags: [UserTags.VERIFICATION_REQUESTS],
    }),
    deleteUser: builder.mutation<any, string>({
      query: (userId) => ({
        url: `users/${userId}`,
        method: 'DELETE',
      }),
      invalidatesTags: (_, error, userId) => [{ type: UserTags.USER, id: userId }, UserTags.USERS],
    }),
    getUser: builder.query<ApiResponse<{ data: IUser }>, string>({
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
    currentUser: builder.query<ApiResponse<{ data: IUser }>, void>({
      query: () => ({
        url: 'users/account/current-user',
        method: 'GET',
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token') || ''}`, // Use token from localStorage
        },
      }),
      providesTags: [UserTags.CURRENT_USER],
    }),
  }),
});

export const {
  useCreateUserMutation,
  useUpdateProfileMutation,
  useUpdateProfilePrictureMutation,
  useUpdatePasswordMutation,
  useCompleteOnBoadrdingMutation,
  useVerifyUserMutation,
  useCurrentUserQuery,
  useUpdateUserMutation,
  useDeleteUserMutation,
  useGetAllVerificationsQuery,
  useGetUserQuery,
  useGetUsersQuery,
  useRequestAccountVerificationMutation
} = userApi;
