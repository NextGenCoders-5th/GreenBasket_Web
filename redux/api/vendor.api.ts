import { createApi } from '@reduxjs/toolkit/query/react';
import { baseQueryWithReauth } from './base.query';
import { AddBankAccountRequest, CreateVendorResponse, IVendor } from '@/types/vendor.type';
import { ApiResponse } from '@/types/base.type';

export enum VendorTags {
  VENDOR = 'Vendor',
  VENDORS = 'Vendors',
  BANK_ACCOUNT = 'Bank_Account',
}

const vendorApi = createApi({
  reducerPath: 'vendorApi',
  baseQuery: baseQueryWithReauth,
  tagTypes: Object.values(VendorTags),
  endpoints: (builder) => ({
    createVendor: builder.mutation<CreateVendorResponse, FormData>({
      query: (vendorData) => ({
        url: 'vendors',
        method: 'POST',
        body: vendorData,
      }),
      invalidatesTags: [VendorTags.VENDORS],
    }),
    updateVendor: builder.mutation<CreateVendorResponse, { vendorId: string; vendorData: FormData }>({
      query: ({ vendorId, vendorData }) => ({
        url: `vendors/${vendorId}`,
        method: 'PATCH',
        body: vendorData,
      }),
      invalidatesTags: (_, error, { vendorId }) => [{ type: VendorTags.VENDOR, id: vendorId }, VendorTags.VENDORS],
    }),
    deleteVendor: builder.mutation<any, string>({
      query: (vendorId) => ({
        url: `vendors/${vendorId}`,
        method: 'DELETE',
      }),
      invalidatesTags: (_, error, vendorId) => [{ type: VendorTags.VENDOR, id: vendorId }, VendorTags.VENDORS],
    }),
    getVendor: builder.query<{ data: { data: IVendor } }, string>({
      query: (vendorId) => ({
        url: `vendors/${vendorId}`,
        method: 'GET',
      }),
      providesTags: (result, error, vendorId) => [{ type: VendorTags.VENDOR, id: vendorId }, VendorTags.VENDORS],
    }),
    getVendors: builder.query<ApiResponse<{ data: IVendor[] }>, string>({
      query: (params) => {
        const queryString = new URLSearchParams(params).toString();
        return {
          url: `vendors?${queryString}`,
          method: 'GET',
        };
      },
      providesTags: [VendorTags.VENDORS],
    }),
    getVendorBalance: builder.query<{ data: { data: any } }, string | undefined>({
      query: (vendorId) => ({
        url: `vendor/balance${vendorId ? `?vendorId=${vendorId}` : ''}`,
        method: 'GET',
      }),
      providesTags: (result, error, vendorId) => [{ type: VendorTags.VENDOR, id: vendorId }, VendorTags.VENDORS],
    }),
    addBankAccount: builder.mutation<CreateVendorResponse, AddBankAccountRequest>({
      query: (data) => ({
        url: `vendor/bank-account`,
        method: 'POST',
        body: data,
      }),
      invalidatesTags: (_, error) => {
        const token = localStorage.getItem('token') || '';
        return [{ type: VendorTags.BANK_ACCOUNT, id: token }];
      },
    }),
    updateBankAccount: builder.mutation<CreateVendorResponse, AddBankAccountRequest>({
      query: (data) => ({
        url: `vendor/bank-account`,
        method: 'PATCH',
        body: data,
      }),
      invalidatesTags: (_, error) => {
        const token = localStorage.getItem('token') || '';
        return [{ type: VendorTags.BANK_ACCOUNT, id: token }];
      },
    }),
    requestWithDrawal: builder.mutation<CreateVendorResponse, void>({
      query: () => ({
        url: `vendor/withdrawal-request`,
        method: 'POST',
      }),
    }),
    getWithdrawalRequests: builder.query<{ data: { data: any } }, string | undefined>({
      query: (vendorId) => ({
        url: `vendor/withdrawal-request${vendorId ? `?vendorId=${vendorId}` : ''}`,
        method: 'GET',
      }),
      providesTags: (result, error, vendorId) => [{ type: VendorTags.VENDOR, id: vendorId }, VendorTags.VENDORS],
    }),
    answerWithdrawalRequest: builder.mutation<CreateVendorResponse, string>({
      query: (requestId) => ({
        url: `vendor/withdrawal-request/${requestId}`,
        method: 'PATCH',
      }),
    }),
  }),
});

export const {
  useCreateVendorMutation,
  useUpdateVendorMutation,
  useDeleteVendorMutation,
  useGetVendorQuery,
  useGetVendorsQuery,
  useGetVendorBalanceQuery,
  useAddBankAccountMutation,
  useAnswerWithdrawalRequestMutation,
  useGetWithdrawalRequestsQuery,
  useRequestWithDrawalMutation,
  useUpdateBankAccountMutation,
} = vendorApi;

export default vendorApi;
