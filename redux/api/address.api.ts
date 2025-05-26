import { createApi } from '@reduxjs/toolkit/query/react';
import { baseQueryWithReauth } from './base.query';
import { CreateAddressRequest, CreateAddressResponse, IAddress } from '@/types/address.type';
import { ApiResponse } from '@/types/base.type';
import { useDeleteVendorMutation } from './vendor.api';

export enum AddressTags {
  ADDRESS = 'Address',
  ADDRESSES = 'Addresses',
  MY_ADDRESS = 'my-address',
}

const addressApi = createApi({
  reducerPath: 'addressApi',
  baseQuery: baseQueryWithReauth,
  tagTypes: Object.values(AddressTags),
  endpoints: (builder) => ({
    addAddress: builder.mutation<CreateAddressResponse, { type: string; data: CreateAddressRequest }>({
      query: ({ type, data }) => ({
        url: `addresses/${type}`,
        method: 'POST',
        body: data,
      }),
      invalidatesTags: [AddressTags.ADDRESSES],
    }),

    updateUserAddress: builder.mutation<CreateAddressResponse,  CreateAddressRequest >({
      query: ( data ) => ({
        url: `addresses/user`,
        method:'PATCH' ,
        body: data,
      }),
      invalidatesTags: [AddressTags.ADDRESSES],
    }),

    updateVendorAddress: builder.mutation<CreateAddressResponse,  {addressId: string, data: CreateAddressRequest} >({
      query: ( {addressId,data} ) => ({
        url: `addresses/vendor/${addressId}`,
        method:'PATCH' ,
        body: data,
      }),
      invalidatesTags: [AddressTags.ADDRESSES],
    }),


 
    deleteAddress: builder.mutation<any, string>({
      query: (addressId) => ({
        url: `addresses/${addressId}`,
        method: 'DELETE',
      }),
      invalidatesTags: (_, error, addressId) => [{ type: AddressTags.ADDRESS, id: addressId }, AddressTags.ADDRESSES],
    }),

 
    deleteVendorAddress: builder.mutation<any, string>({
      query: (addressId) => ({
        url: `addresses/vendor/${addressId}`,
        method: 'DELETE',
      }),
      invalidatesTags: (_, error, addressId) => [{ type: AddressTags.ADDRESS, id: addressId }, AddressTags.ADDRESSES],
    }),
    getAddress: builder.query<{ data: { data: IAddress } }, string>({
      query: (addressId) => ({
        url: `addresses/${addressId}`,
        method: 'GET',
      }),
      providesTags: (result, error, addressId) => [{ type: AddressTags.ADDRESS, id: addressId }, AddressTags.ADDRESSES],
    }),

    getUserAddress: builder.query<{ data: { data: IAddress } }, string | undefined>({
      query: (userId) => ({
        url: `addresses/user${userId ? `?userId=${userId}` : ''}`,
        method: 'GET',
      }),
      providesTags: (result, error, addressId) => [{ type: AddressTags.ADDRESS, id: addressId }, AddressTags.ADDRESSES],
    }),
    getMyAddress: builder.query<{ data: { data: IAddress } }, void>({
      query: () => ({
        url: `addresses/user`,
        method: 'GET',
      }),
      providesTags: () => {
        const refreshToken = localStorage.getItem('refreshToken');
        return [{ type: AddressTags.MY_ADDRESS, id: refreshToken || '' }];
      },
    }),
    getVendorAddress: builder.query<{ data: { data: IAddress } }, string>({
      query: (vendorId) => {
        return ({
          url: `addresses/vendor?vendorId=`+vendorId,
          method: 'GET',
        })
      },
      providesTags: () => {
        const refreshToken = localStorage.getItem('refreshToken');
        return [{ type: AddressTags.MY_ADDRESS, id: refreshToken || '' }];
      },
    }),
    getAddresses: builder.query<ApiResponse<{ data: IAddress[] }>,string | undefined>({
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

export const {
  useAddAddressMutation,
  useGetMyAddressQuery,
  useUpdateUserAddressMutation,
  useUpdateVendorAddressMutation,
  useDeleteAddressMutation,
  useGetAddressQuery,
  useGetAddressesQuery,
  useGetUserAddressQuery,
  useGetVendorAddressQuery,
  useDeleteVendorAddressMutation,
  
} = addressApi;

export default addressApi;
