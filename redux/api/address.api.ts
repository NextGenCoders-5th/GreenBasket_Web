import { createApi } from '@reduxjs/toolkit/query/react';
import {  baseQueryWithReauth } from './base.query';
import { CreateAddressRequest, CreateAddressResponse, IAddress } from '@/types/address.type';
import { ApiResponse } from '@/types/base.type';

export enum AddressTags {
  ADDRESS = 'Address',
  ADDRESSES = 'Addresses',
  MY_ADDRESS = 'my-address'
}

const addressApi = createApi({
  reducerPath: 'addressApi',
  baseQuery: baseQueryWithReauth,
  tagTypes: Object.values(AddressTags),
  endpoints: (builder) => ({
    addMyAddress: builder.mutation<CreateAddressResponse, CreateAddressRequest>({
      query: (addressData) => ({
        url: 'addresses/user',
        method: 'POST',
        body: addressData,
      }),
      invalidatesTags: [AddressTags.ADDRESSES],
    }),

    updateMyAddress: builder.mutation<CreateAddressResponse, CreateAddressRequest>({
      query: ( addressData ) => ({
        url: `addresses/user`,
        method: 'PATCH',
        body: addressData,
      }),
      invalidatesTags: (_, error) => {
        const refreshToken = localStorage.getItem('rfreshToken') || "";
        return [{type:AddressTags.MY_ADDRESS, id: refreshToken}]
      },
    }),

    updateAddress: builder.mutation<CreateAddressResponse, any>({
      query: ({ addressId, addressData }) => ({
        url: `addresses/${addressId}`,
        method: 'PATCH',
        body: addressData,
      }),
      invalidatesTags: (_, error, { addressId }) => [{ type: AddressTags.ADDRESS, id: addressId }, AddressTags.ADDRESSES],
    }),
    deleteAddress: builder.mutation<any, string>({
      query: (addressId) => ({
        url: `addresses/${addressId}`,
        method: 'DELETE',
      }),
      invalidatesTags: (_, error, addressId) => [{ type: AddressTags.ADDRESS, id: addressId }, AddressTags.ADDRESSES],
    }),
    getAddress: builder.query<{data: {data: IAddress}}, string>({
      query: (addressId) => ({
        url: `addresses/${addressId}`,
        method: 'GET',
      }),
      providesTags: (result, error, addressId) => [{ type: AddressTags.ADDRESS, id: addressId }, AddressTags.ADDRESSES],
    }),
    getMyAddress: builder.query<{data: {data: IAddress}}, void>({
      query: () => ({
        url: `addresses/user`,
        method: 'GET',
      }),
      providesTags: () =>{
        const refreshToken = localStorage.getItem('refreshToken')
        return [{type: AddressTags.MY_ADDRESS, id:refreshToken || ""}]
      },
    }),
    getAddresses: builder.query<ApiResponse<{ data: IAddress[] }>, string>({
      query: (params) => {
        const queryString = new URLSearchParams(params).toString();
        return {
          url: `addresses?${queryString}`,
          method: 'GET',
        };
      },
      providesTags: [AddressTags.ADDRESSES],
    }),
  }),
});

export const { useAddMyAddressMutation,useUpdateMyAddressMutation, useGetMyAddressQuery, useUpdateAddressMutation, useDeleteAddressMutation, useGetAddressQuery, useGetAddressesQuery } = addressApi;

export default addressApi;
