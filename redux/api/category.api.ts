import { createApi } from '@reduxjs/toolkit/query/react';
import {  baseQueryWithReauth } from './base.query';
import { CreateCategoryRequest, CreateCategoryResponse, ICategory } from '@/types/category.type';
import { ApiResponse } from '@/types/base.type';

export enum CategoryTags {
  CATEGORY = 'Category',
  CATEGORIES = 'Categories',
}

const categoryApi = createApi({
  reducerPath: 'categoryApi',
  baseQuery: baseQueryWithReauth,
  tagTypes: Object.values(CategoryTags),
  endpoints: (builder) => ({
    createCategory: builder.mutation<CreateCategoryResponse, FormData>({
      query: (categoryData) => ({
        url: 'categories',
        method: 'POST',
        body: categoryData,
      }),
      invalidatesTags: [CategoryTags.CATEGORIES],
    }),
    updateCategory: builder.mutation<CreateCategoryResponse, { categoryId: string; categoryData: FormData}>({
      query: ({ categoryId, categoryData }) => ({
        url: `categories/${categoryId}`,
        method: 'PATCH',
        body: categoryData
      }),
      invalidatesTags: (_, error, { categoryId }) => [{ type: CategoryTags.CATEGORY, id: categoryId }, CategoryTags.CATEGORIES],
    }),
    deleteCategory: builder.mutation<any, string>({
      query: (categoryId) => ({
        url: `categories/${categoryId}`,
        method: 'DELETE',
      }),
      invalidatesTags: (_, error, categoryId) => [{ type: CategoryTags.CATEGORY, id: categoryId }, CategoryTags.CATEGORIES],
    }),
    getCategory: builder.query<{data: {data: ICategory}}, string>({
      query: (categoryId) => ({
        url: `categories/${categoryId}`,
        method: 'GET',
      }),
      providesTags: (result, error, categoryId) => [{ type: CategoryTags.CATEGORY, id: categoryId }, CategoryTags.CATEGORIES],
    }),
    getCategories: builder.query<ApiResponse<{ data: ICategory[] }>, string>({
      query: (params) => {
        const queryString = new URLSearchParams(params).toString();
        return {
          url: `categories?${queryString}`,
          method: 'GET',
        };
      },
      providesTags: [CategoryTags.CATEGORIES],
    }),
  }),
});

export const { useCreateCategoryMutation, useUpdateCategoryMutation, useDeleteCategoryMutation, useGetCategoryQuery, useGetCategoriesQuery } = categoryApi;

export default categoryApi;
