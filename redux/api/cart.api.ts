import { createApi } from '@reduxjs/toolkit/query/react';
import {  baseQueryWithReauth } from './base.query';
import { ApiResponse } from '@/types/base.type';
import { Cart } from '@/types/cart.type';

export enum CartTags {
  MY_CART = 'MyCart',
  MY_CARTS = 'MyCarts',
}

const cartApi = createApi({
  reducerPath: 'cartApi',
  baseQuery: baseQueryWithReauth,
  tagTypes: Object.values(CartTags),
  endpoints: (builder) => ({
    getMyCarts: builder.query<ApiResponse<{ data: Cart[] }>, void>({
      query: () => {
        return {
          url: `cart/my-carts`,
          method: 'GET',
        };
      },
      providesTags: [CartTags.MY_CARTS],
    }),
    getMyCart: builder.query<ApiResponse<{ data: Cart }>, void>({
      query: () => ({
        url: `cart/my-cart`,
        method: 'GET',
      }),
      providesTags: [CartTags.MY_CART],
    }),
  }),
})

export const {  useGetMyCartsQuery, useGetMyCartQuery } = cartApi;

export default cartApi;
