import { createApi } from '@reduxjs/toolkit/query/react';
import { baseQueryWithReauth } from './base.query';
import { CreatePaymentRequest, CreatePaymentResponse, IPayment } from '@/types/payment.type';
import { ApiResponse } from '@/types/base.type';

export enum PaymentTags {
  PAYMENT = 'Payment',
  PAYMENTS = 'Payments',
  MY_PAYMENTS = 'MyPayments',
}

const paymentApi = createApi({
  reducerPath: 'paymentApi',
  baseQuery: baseQueryWithReauth,
  tagTypes: Object.values(PaymentTags),
  endpoints: (builder) => ({
    initializePayment: builder.mutation<ApiResponse<{data: any}>, CreatePaymentRequest>({
      query: (paymentData) => ({
        url: 'payments/initialize',
        method: 'POST',
        body: paymentData,
      }),
      invalidatesTags: [PaymentTags.PAYMENTS],
    }),
    verifyPayment: builder.mutation<CreatePaymentResponse, any>({
      query: (paymentData) => ({
        url: 'payments/chapa/chapa/webhook/verify',
        method: 'GET',
        body: paymentData,
      }),
      invalidatesTags: [PaymentTags.PAYMENTS],
    }),
    updatePayment: builder.mutation<CreatePaymentResponse, any>({
      query: ({ paymentId, paymentData }) => ({
        url: `payments/${paymentId}`,
        method: 'PATCH',
        body: paymentData,
      }),
      invalidatesTags: (_, error, { paymentId }) => [{ type: PaymentTags.PAYMENT, id: paymentId }, PaymentTags.PAYMENTS],
    }),
    deletePayment: builder.mutation<any, string>({
      query: (paymentId) => ({
        url: `payments/${paymentId}`,
        method: 'DELETE',
      }),
      invalidatesTags: (_, error, paymentId) => [{ type: PaymentTags.PAYMENT, id: paymentId }, PaymentTags.PAYMENTS],
    }),
    getPayment: builder.query<{ data: { data: IPayment } }, string>({
      query: (paymentId) => ({
        url: `payments/${paymentId}`,
        method: 'GET',
      }),
      providesTags: (result, error, paymentId) => [{ type: PaymentTags.PAYMENT, id: paymentId }, PaymentTags.PAYMENTS],
    }),

    getSupportedBanks: builder.query<{ data: { data: IPayment } }, void>({
      query: () => ({
        url: `payments/chapa/chapa/supported-banks`,
        method: 'GET',
      }),
    }),
    getPayments: builder.query<ApiResponse<{ data: IPayment[] }>, string>({
      query: (params) => {
        const queryString = new URLSearchParams(params).toString();
        return {
          url: `payments?${queryString}`,
          method: 'GET',
        };
      },
      providesTags: [PaymentTags.PAYMENTS],
    }),
    getMyPayments: builder.query<ApiResponse<{ data: IPayment[] }>, void>({
      query: () => {
        return {
          url: `payments/my-payments`,
          method: 'GET',
        };
      },
      providesTags: () => {
        const accessToken = localStorage.getItem('accessToken');
        return [{ type: PaymentTags.MY_PAYMENTS, id: accessToken || 'MY_PAYMENTS' }];
      },
    }),
    getProductPayment: builder.query<{ data: { data: IPayment } }, string>({
      query: (productId) => ({
        url: `payments/product/${productId}`,
        method: 'GET',
      }),
      providesTags: (result, error, productId) => [{ type: PaymentTags.PAYMENT, id: productId }, PaymentTags.PAYMENTS],
    }),
    deletMyPayment: builder.mutation<any, string>({
      query: (paymentId) => ({
        url: `payments/my-payments/${paymentId}`,
        method: 'DELETE',
      }),
      invalidatesTags: (_, error, paymentId) => [{ type: PaymentTags.MY_PAYMENTS, id: paymentId }, PaymentTags.PAYMENTS],
    }),
  }),
});

export const {
  useInitializePaymentMutation,
  useGetMyPaymentsQuery,
  useUpdatePaymentMutation,
  useDeletePaymentMutation,
  useGetPaymentQuery,
  useGetPaymentsQuery,
  useGetProductPaymentQuery,
  useDeletMyPaymentMutation,
  useGetSupportedBanksQuery,
  useVerifyPaymentMutation,
} = paymentApi;

export default paymentApi;
