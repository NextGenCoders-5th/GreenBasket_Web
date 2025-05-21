import { createApi } from '@reduxjs/toolkit/query/react';
import {  baseQueryWithReauth } from './base.query';
import { CreateProductRequest, CreateProductResponse, IProduct } from '@/types/product.type';
import { ApiResponse } from '@/types/base.type';

export enum ProductTags {
  PRODUCT = 'Product',
  PRODUCTS = 'Products',
}

const productApi = createApi({
  reducerPath: 'productApi',
  baseQuery: baseQueryWithReauth,
  tagTypes: Object.values(ProductTags),
  endpoints: (builder) => ({
    createProduct: builder.mutation<CreateProductResponse, any>({
      query: (productData) => ({
        url: 'products',
        method: 'POST',
        body: productData,
      }),
      invalidatesTags: [ProductTags.PRODUCTS],
    }),
    updateProduct: builder.mutation<CreateProductResponse, any>({
      query: ({ productId, productData }) => ({
        url: `products/${productId}`,
        method: 'PATCH',
        body: productData,
      }),
      invalidatesTags: (_, error, { productId }) => [{ type: ProductTags.PRODUCT, id: productId }, ProductTags.PRODUCTS],
    }),
    deleteProduct: builder.mutation<any, string>({
      query: (productId) => ({
        url: `products/${productId}`,
        method: 'DELETE',
      }),
      invalidatesTags: (_, error, productId) => [{ type: ProductTags.PRODUCT, id: productId }, ProductTags.PRODUCTS],
    }),
    getProduct: builder.query<{data: {data: IProduct}}, string>({
      query: (productId) => ({
        url: `products/${productId}`,
        method: 'GET',
      }),
      providesTags: (result, error, productId) => [{ type: ProductTags.PRODUCT, id: productId }, ProductTags.PRODUCTS],
    }),
    getProducts: builder.query<ApiResponse<{ data: IProduct[] }>, string>({
      query: (params) => {
        const queryString = new URLSearchParams(params).toString();
        return {
          url: `products?${queryString}`,
          method: 'GET',
        };
      },
      providesTags: [ProductTags.PRODUCTS],
    }),
  }),
});

export const { useCreateProductMutation, useUpdateProductMutation, useDeleteProductMutation, useGetProductQuery, useGetProductsQuery } = productApi;

export default productApi;
