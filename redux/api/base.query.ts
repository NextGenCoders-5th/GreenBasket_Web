import { BaseQueryApi, FetchArgs, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { toast } from 'sonner';

export const BASE_URL = 'http://localhost:5000/api/v1/'; // Replace with your actual base URL
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
    const refreshResult = await baseQuery(
      {
        url: 'auth/refresh', // Your refresh token endpoint
        method: 'POST',
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
      // api.dispatch(logout());
    }
  } else if (result.error && result.error.status === 403) {
    console.log('Forbidden: ', result.error);
    !isSilent && toast.error('You do not have permission to access this resource.');
    return { error: { status: 'FORBIDDEN', message: 'Forbidden' } };
  } else if (result.error && result.error.status === 404) {
    console.log('Not Found: ', result.error);
    !isSilent && toast.error('The requested resource was not found.');
    return { error: { status: 'NOT_FOUND', message: 'Not Found' } };
  } else if (result.error && result.error.status === 500) {
    console.log('Server Error: ', result.error);
    !isSilent && toast.error('An internal server error occurred.');
    return { error: { status: 'SERVER_ERROR', message: 'Server Error' } };
  } else if (result.error && result.error.status === 400) {
    console.log('Bad Request: ', result.error);
    if (result.error.data && typeof result.error.data === 'string' && !isSilent) {
      toast.error(result.error.data as string);
    } else if (!isSilent && result.error.data && typeof result.error.data === 'object' && 'message' in result.error.data) {
      toast.error(result.error.data.message as string);
    } else {
      return { error: { status: 'UNKOWN_ERROR', message: 'Bad Request' } };
    }
    return { error: { status: 'BAD_REQUEST', message: 'Bad Request' } };
  } else if (result.error?.status === 'FETCH_ERROR') {
    console.log('Network error: ', result.error);
    !isSilent && toast.error('Network error. Please check your internet connection.');
    return { error: { status: 'NETWORK_ERROR', message: 'Network error' } };
  } else if (result.error && typeof result.error.data === 'string') {
    !isSilent && toast.error(result.error.data as string);
    return { error: { status: 'BAD_REQUEST', message: result.error.data as string } };
  } else if (result.error) {
    return { error: { status: 'UNKOWN_ERROR', data: result.error.data, message: 'Unexpected error' } };
  }

  return result;
};
