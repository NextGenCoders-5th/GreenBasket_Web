import { createApi } from '@reduxjs/toolkit/query/react';
import { baseQueryWithReauth } from './base.query';
import { ForgotPasswordRequest, ILoginRequest, ISignUpRequest, ResetPasswordRequest, SignUpResponse } from '@/types/auth.type';

export enum AuthTags {
  Login = 'Login',
  Logout = 'Logout',
  Register = 'Register',
  Refresh = 'Refresh',
  VerifyEmail = 'VerifyEmail',
  ResetPassword = 'ResetPassword',
  ChangePassword = 'ChangePassword',
  VerifyToken = 'VerifyToken',
}

const authApi = createApi({
  reducerPath: 'authApi',
  baseQuery: baseQueryWithReauth,
  tagTypes: Object.values(AuthTags),
  endpoints: (builder) => ({
    login: builder.mutation<SignUpResponse, ILoginRequest>({
      query: (credentials) => {
        // Check if the identifier is a phone number or email
        const isEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(credentials.identifier);
        const key = isEmail ? 'email' : 'phoneNumber';
        return {
          url: 'auth/sign-in',
          method: 'POST',
          body: {
            [key]: credentials.identifier,
            password: credentials.password,
          },
        };
      },
      invalidatesTags: [AuthTags.Login],
    }),
    logout: builder.mutation<any, void>({
      query: () => ({
        url: 'auth/logout',
        method: 'PATCH',
      }),
      invalidatesTags: [AuthTags.Logout],
    }),
    signUp: builder.mutation<SignUpResponse, ISignUpRequest>({
      query: (userData) => ({
        url: 'auth/sign-up',
        method: 'POST',
        body: userData,
      }),
      invalidatesTags: [AuthTags.Register],
    }),
    refreshToken: builder.mutation<any, void>({
      query: () => {
        // Get the refresh token from cookies
        const refreshToken = document.cookie.split('; ').find((row) => row.startsWith('refreshToken='));
        return {
          url: 'auth/refresh-token',
          method: 'POST',
          body: { refreshToken },
        };
      },
      invalidatesTags: [AuthTags.Refresh],
    }),
    verifyEmail: builder.mutation({
      query: (token) => ({
        url: `auth/verify-email/${token}`,
        method: 'POST',
      }),
      invalidatesTags: [AuthTags.VerifyEmail],
    }),
    resetPassword: builder.mutation<any, ResetPasswordRequest>({
      query: ({resetToken, body}) => ({
        url: `auth/reset-password/${resetToken}`,
        method: 'POST',
        body: body,
      }),
      invalidatesTags: [AuthTags.ResetPassword],
    }),
    fotgotPassword: builder.mutation<any, ForgotPasswordRequest>({
      query: (data) => ({
        url: 'auth/forgot-password',
        method: 'POST',
        body: data,
      }),
      invalidatesTags: [AuthTags.ResetPassword],
    }),
    changePassword: builder.mutation({
      query: (data) => ({
        url: 'auth/change-password',
        method: 'POST',
        body: data,
      }),
      invalidatesTags: [AuthTags.ChangePassword],
    }),
    verifyToken: builder.mutation({
      query: (token) => ({
        url: `auth/verify-token/${token}`,
        method: 'POST',
      }),
      invalidatesTags: [AuthTags.VerifyToken],
    }),
  }),
});
export const {
  useLoginMutation,
  useLogoutMutation,
  useSignUpMutation,
  useRefreshTokenMutation,
  useVerifyEmailMutation,
  useResetPasswordMutation,
  useChangePasswordMutation,
  useVerifyTokenMutation,
  useFotgotPasswordMutation
} = authApi;

export { authApi };
