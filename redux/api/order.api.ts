import { createApi } from '@reduxjs/toolkit/query/react';
import { baseQueryWithReauth } from './base.query';
import { CheckoutOrderRequest } from '@/types/order.type';
import { ApiResponse } from '@/types/base.type';
import { Order } from '@/types/or.type';

export enum OrderTags {
  ORDER = 'Order',
  ORDERS = 'Orders',
  MY_ORDERS = 'My orders',
}

const orderApi = createApi({
  reducerPath: 'orderApi',
  baseQuery: baseQueryWithReauth,
  tagTypes: Object.values(OrderTags),
  endpoints: (builder) => ({
    createOrder: builder.mutation<any, any>({
      query: (orderData) => ({
        url: 'orders',
        method: 'POST',
        body: orderData,
      }),
      invalidatesTags: [OrderTags.ORDERS],
    }),
    updateOrder: builder.mutation<any, any>({
      query: ({ orderId, orderData }) => ({
        url: `orders/${orderId}`,
        method: 'PATCH',
        body: orderData,
      }),
      invalidatesTags: (_, error, { orderId }) => [{ type: OrderTags.ORDER, id: orderId }, OrderTags.ORDERS],
    }),
    deleteOrder: builder.mutation<any, string>({
      query: (orderId) => ({
        url: `orders/${orderId}`,
        method: 'DELETE',
      }),
      invalidatesTags: (_, error, orderId) => [{ type: OrderTags.ORDER, id: orderId }, OrderTags.ORDERS],
    }),
    getOrder: builder.query<{ data: { data: Order } }, string>({
      query: (orderId) => ({
        url: `orders/${orderId}`,
        method: 'GET',
      }),
      providesTags: (result, error, orderId) => [{ type: OrderTags.ORDER, id: orderId }, OrderTags.ORDERS],
    }),
    getMyOrder: builder.query<{ data: { data: Order } }, string>({
      query: (orderId) => ({
        url: `orders/my-orders/${orderId}`,
        method: 'GET',
      }),
      providesTags: (result, error, orderId) => [{ type: OrderTags.ORDER, id: orderId }, OrderTags.ORDERS],
    }),
    getMyOrders: builder.query<{ data: { data: Order[] } }, string | void>({
      query: (params) => {
        return {
          url: `orders/my-orders`,
          method: 'GET',
          params: {status: params}
        };

      },
      providesTags: [OrderTags.MY_ORDERS]
    }),
    getOrders: builder.query<ApiResponse<{ data: Order[] }>, string>({
      query: (params) => {
        const queryString = new URLSearchParams(params).toString();
        return {
          url: `orders?${queryString}`,
          method: 'GET',
        };
      },
      providesTags: [OrderTags.ORDERS],
    }),
    getVendorOrders: builder.query<ApiResponse<{ data: Order[] }>, string>({
      query: (params) => {
        return {
          url: `orders/vendor/${params }`,
          method: 'GET',
        };
      },
      providesTags: [OrderTags.ORDERS],
    }),
    getMyCarts: builder.query<ApiResponse<{ data: Order[] }>, void>({
      query: () => {
        return {
          url: `orders/user`,
          method: 'GET',
        };
      },
      providesTags: () => {
        const accessToken = localStorage.getItem('token');
        return [{ type: OrderTags.MY_ORDERS, id: accessToken || '' }];
      },
    }),
    checkOutOrder: builder.mutation<any, CheckoutOrderRequest>({
      query: (orderData) => ({
        url: `orders/checkout`,
        method: 'POST',
        body: orderData,
      }),
      invalidatesTags: (_, error, ) => {
        const token = localStorage.getItem('token') || ""
        return [{type: OrderTags.MY_ORDERS, id: token}]
      },
    }),
    updateOrderStatus: builder.mutation<any, {orderId:string, status: string}>({
      query: ({  orderId,status }) => ({
        url: `orders/${orderId}`,
        method: 'PATCH',
        body: {status},
      }),
      invalidatesTags: (_, error, { orderId }) => [{ type: OrderTags.ORDER, id: orderId }, OrderTags.ORDERS],
    }),
  }),
});

export const {
  useCreateOrderMutation,
  useGetMyCartsQuery,
  useUpdateOrderMutation,
  useDeleteOrderMutation,
  useGetOrderQuery,
  useGetOrdersQuery,
  useGetMyOrderQuery,
  useGetMyOrdersQuery,
  useGetVendorOrdersQuery,
  useCheckOutOrderMutation,
  useUpdateOrderStatusMutation
} = orderApi;

export default orderApi;
