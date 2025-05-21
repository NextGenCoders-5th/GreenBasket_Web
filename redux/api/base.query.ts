import { BaseQueryApi, FetchArgs, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { ErrorEnum } from '@/enums/error.enum';
export const BASE_URL = 'http://localhost:5000/api/v1/'; // Replace with your actual base URL
export const API_URL = 'https://multi-vendor-marketplace-backend-6pue.onrender.com/api/v1/'; // Replace with your actual base URL
export const baseQuery = fetchBaseQuery({
  baseUrl: BASE_URL,
  credentials: 'include',
});

export const baseQueryWithReauth = async (args: string | FetchArgs, api: BaseQueryApi, extraOptions: {}) => {
  let result = await baseQuery(args, api, extraOptions);
  console.log(result);

  const isSilent = typeof args === 'string' ? args.includes('current-user') : args.url.includes('current-user');
  if (result.error && result.error.status === 401) {
    // Attempt token refresh
    const refreshToken = localStorage.getItem('refreshToken');
    const refreshResult = await baseQuery(
      {
        url: 'auth/refresh-token', // Your refresh token endpoint
        method: 'POST',
        body: { refreshToken }, // Pass the refresh token in the request body
      },
      api,
      extraOptions,
    );

    if (refreshResult.data) {
      const refreshedData = refreshResult.data as { token: string; refreshToken: string }; // Explicitly type the response

      localStorage.setItem('token', refreshedData.token);
      localStorage.setItem('refreshToken', refreshedData.refreshToken);
      // Retry the original request with new token
      result = await baseQuery(args, api, extraOptions);
    } else {
      console.log('Token refresh failed, logging out...');
      localStorage.removeItem('token');
      localStorage.removeItem('refreshToken');
      window.location.href = '/login'; // Redirect to login page
    }
  } else if (result.error && result.error.status === 403) {
    console.log('Forbidden: ', result.error);
    // !isSilent && toast.error('You do not have permission to access this resource.');
    return { error: { status: ErrorEnum.FORBIDDEN, message: "You do not have permission to access this resource."} };
  } else if (result.error && result.error.status === 404) {
    console.log('Not Found: ', result.error);
    // !isSilent && toast.error('The requested resource was not found.');
    return { error: { status: ErrorEnum.NOT_FOUND, message:(result.error as unknown as {data: {message: string}})?.data?.message || 'The requested resource was not found.'} };
  } else if (result.error && result.error.status === 500) {
    console.log('Server Error: ', result.error);
    // !isSilent && toast.error('An internal server error occurred.');
    return { error: { status: ErrorEnum.SERVER_ERROR, message: 'An internal server error occurred' } };
  } else if (result.error && result.error.status === 400) {
    console.log('Bad Request: ', result.error);
    let message =""
    if (result.error.data && typeof result.error.data === 'string' && !isSilent) {
      message = (result.error.data as string);
    } else if (!isSilent && result.error.data && typeof result.error.data === 'object' && 'message' in result.error.data) {
      message =(result.error.data.message as string);
    } else {
      return { error: { status: ErrorEnum.UNKOWN_ERROR, message: message } };
    }
    return { error: { status: ErrorEnum.BAD_REQUEST, message: message  } };
  } else if (result.error?.status === ErrorEnum.FETCH_ERROR) {
    console.log('Network error: ', result.error);
    // !isSilent && toast.error('Network error. Please check your internet connection.');
    return { error: { status: ErrorEnum.NETWORK_ERROR, message: 'Please check your internet connection.' } };
  } else if (result.error && typeof result.error.data === 'string') {
    // !isSilent && toast.error(result.error.data as string);
    return { error: { status: ErrorEnum.BAD_REQUEST, message: result.error.data as string } };
  } else if (result.error) {
    return { error: { status: ErrorEnum.UNKOWN_ERROR, data: result.error.data, message: 'Unexpected error' } };
  }

  return result;
};
