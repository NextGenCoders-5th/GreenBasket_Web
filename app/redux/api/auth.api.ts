import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQuery } from "./base.query";
import { ILoginRequest, ISignUpRequest, SignUpResponse } from "@/app/@types/auth.type";

export enum AuthTags {
    Login = "Login",
    Logout = "Logout",
    Register = "Register",
    Refresh = "Refresh",
    VerifyEmail = "VerifyEmail",
    ResetPassword = "ResetPassword",
    ChangePassword = "ChangePassword",
    VerifyToken = "VerifyToken",
}

const authApi = createApi({
    reducerPath: "authApi",
    baseQuery:baseQuery,
    tagTypes: Object.values(AuthTags),
    endpoints: (builder) => ({
        login: builder.mutation<SignUpResponse, ILoginRequest>({
            query: (credentials) => ({
                url: "auth/sign-in",
                method: "POST",
                body: credentials,
            }),
            invalidatesTags: [AuthTags.Login],
        }),
        logout: builder.mutation({
            query: () => ({
                url: "auth/logout",
                method: "POST",
            }),
            invalidatesTags: [AuthTags.Logout],
        }),
        signUp: builder.mutation<SignUpResponse, ISignUpRequest>({
            query: (userData) => ({
                url: "auth/sign-up",
                method: "POST",
                body: userData,
            }),
            invalidatesTags: [AuthTags.Register],
        }),
        refreshToken: builder.mutation({
            query: () => ({
                url: "auth/refresh",
                method: "POST",
            }),
            invalidatesTags: [AuthTags.Refresh],
        }),
        verifyEmail: builder.mutation({
            query: (token) => ({
                url: `auth/verify-email/${token}`,
                method: "POST",
            }),
            invalidatesTags: [AuthTags.VerifyEmail],
        }),
        resetPassword: builder.mutation({
            query: (data) => ({
                url: "auth/reset-password",
                method: "POST",
                body: data,
            }),
            invalidatesTags: [AuthTags.ResetPassword],
        }), 
        changePassword: builder.mutation({
            query: (data) => ({
                url: "auth/change-password",
                method: "POST",
                body: data,
            }),
            invalidatesTags: [AuthTags.ChangePassword],
        }),
        verifyToken: builder.mutation({
            query: (token) => ({
                url: `auth/verify-token/${token}`,
                method: "POST",
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
} = authApi;
