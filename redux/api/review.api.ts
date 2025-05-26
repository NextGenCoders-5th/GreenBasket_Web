import { createApi } from '@reduxjs/toolkit/query/react';
import { baseQueryWithReauth } from './base.query';
import { CreateReviewRequest, CreateReviewResponse, IReview } from '@/types/review.type';
import { ApiResponse } from '@/types/base.type';

export enum ReviewTags {
  REVIEW = 'Review',
  REVIEWS = 'Reviews',
  MY_REVIEWS = 'MyReviews',
}

const reviewApi = createApi({
  reducerPath: 'reviewApi',
  baseQuery: baseQueryWithReauth,
  tagTypes: Object.values(ReviewTags),
  endpoints: (builder) => ({
    createReview: builder.mutation<CreateReviewResponse, CreateReviewRequest>({
      query: (reviewData) => ({
        url: 'reviews',
        method: 'POST',
        body: reviewData,
      }),
      invalidatesTags: [ReviewTags.REVIEWS],
    }),
    updateReview: builder.mutation<CreateReviewResponse, any>({
      query: ({ reviewId, reviewData }) => ({
        url: `reviews/${reviewId}`,
        method: 'PATCH',
        body: reviewData,
      }),
      invalidatesTags: (_, error, { reviewId }) => [{ type: ReviewTags.REVIEW, id: reviewId }, ReviewTags.REVIEWS],
    }),
    deleteReview: builder.mutation<any, string>({
      query: (reviewId) => ({
        url: `reviews/${reviewId}`,
        method: 'DELETE',
      }),
      invalidatesTags: (_, error, reviewId) => [{ type: ReviewTags.REVIEW, id: reviewId }, ReviewTags.REVIEWS],
    }),
    getReview: builder.query<{ data: { data: IReview } }, string>({
      query: (reviewId) => ({
        url: `reviews/${reviewId}`,
        method: 'GET',
      }),
      providesTags: (result, error, reviewId) => [{ type: ReviewTags.REVIEW, id: reviewId }, ReviewTags.REVIEWS],
    }),
    getReviews: builder.query<ApiResponse<{ data: IReview[] }>, string>({
      query: (params) => {
        const queryString = new URLSearchParams(params).toString();
        return {
          url: `reviews?${queryString}`,
          method: 'GET',
        };
      },
      providesTags: [ReviewTags.REVIEWS],
    }),
    getMyReviews: builder.query<ApiResponse<{ data: IReview[] }>, void>({
      query: () => {
        return {
          url: `reviews/my-reviews`,
          method: 'GET',
        };
      },
      providesTags: () => {
        const accessToken = localStorage.getItem('accessToken');
        return [{ type: ReviewTags.MY_REVIEWS, id: accessToken || 'MY_REVIEWS' }];
      },
    }),
    getProductReview: builder.query<{ data: { data: IReview } }, string>({
      query: (productId) => ({
        url: `reviews/product/${productId}`,
        method: 'GET',
      }),
      providesTags: (result, error, productId) => [{ type: ReviewTags.REVIEW, id: productId }, ReviewTags.REVIEWS],
    }),
    deletMyReview: builder.mutation<any, string>({
      query: (reviewId) => ({
        url: `reviews/my-reviews/${reviewId}`,
        method: 'DELETE',
      }),
      invalidatesTags: (_, error, reviewId) => [{ type: ReviewTags.MY_REVIEWS, id: reviewId }, ReviewTags.REVIEWS],
    }),
  }),
});

export const {
  useCreateReviewMutation,
  useGetMyReviewsQuery,
  useUpdateReviewMutation,
  useDeleteReviewMutation,
  useGetReviewQuery,
  useGetReviewsQuery,
  useGetProductReviewQuery,
  useDeletMyReviewMutation,
} = reviewApi;

export default reviewApi;
