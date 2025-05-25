import { createApi } from '@reduxjs/toolkit/query/react';
import {  baseQueryWithReauth } from './base.query';
import { CreateCartItemRequest, CreateCartItemResponse, ICartItem } from '@/types/cart.type';
import { ApiResponse } from '@/types/base.type';

export enum CartItemTags {
  CART_ITEM = 'CartItem',
  CART_ITEMS = 'CartItems',
  MY_CARTS = 'MyCarts',
}

const cartItemApi = createApi({
  reducerPath: 'cartItemApi',
  baseQuery: baseQueryWithReauth,
  tagTypes: Object.values(CartItemTags),
  endpoints: (builder) => ({
    createCartItem: builder.mutation<CreateCartItemResponse, CreateCartItemRequest>({
      query: (cartItemData) => ({
        url: 'cart-items',
        method: 'POST',
        body: cartItemData,
      }),
      invalidatesTags: [CartItemTags.CART_ITEMS],
    }),
    updateCartItem: builder.mutation<CreateCartItemResponse, any>({
      query: ({ cartItemId, cartItemData }) => ({
        url: `cart-items/${cartItemId}`,
        method: 'PATCH',
        body: cartItemData,
      }),
      invalidatesTags: (_, error, { cartItemId }) => [{ type: CartItemTags.CART_ITEM, id: cartItemId }, CartItemTags.CART_ITEMS],
    }),
    deleteCartItem: builder.mutation<any, string>({
      query: (cartItemId) => ({
        url: `cart-items/${cartItemId}`,
        method: 'DELETE',
      }),
      invalidatesTags: (_, error, cartItemId) => [{ type: CartItemTags.CART_ITEM, id: cartItemId }, CartItemTags.CART_ITEMS],
    }),
    getCartItem: builder.query<{data: {data: ICartItem}}, string>({
      query: (cartItemId) => ({
        url: `cart-items/${cartItemId}`,
        method: 'GET',
      }),
      providesTags: (result, error, cartItemId) => [{ type: CartItemTags.CART_ITEM, id: cartItemId }, CartItemTags.CART_ITEMS],
    }),
    getCartItems: builder.query<ApiResponse<{ data: ICartItem[] }>, string>({
      query: (params) => {
        const queryString = new URLSearchParams(params).toString();
        return {
          url: `cart-items?${queryString}`,
          method: 'GET',
        };
      },
      providesTags: [CartItemTags.CART_ITEMS],
    }),
    getMyCarts: builder.query<ApiResponse<{ data: ICartItem[] }>, void>({
      query: () => {
        return {
          url: `cart-items/user`,
          method: 'GET',
        };
      },
      providesTags: () => {
        const accessToken = localStorage.getItem('accessToken');
        return [
          { type: CartItemTags.MY_CARTS, id: accessToken || 'MY_CARTS' },
        ];
      },
    }),
  }),
})

export const { useCreateCartItemMutation, useGetMyCartsQuery, useUpdateCartItemMutation, useDeleteCartItemMutation, useGetCartItemQuery, useGetCartItemsQuery } = cartItemApi;

export default cartItemApi;
