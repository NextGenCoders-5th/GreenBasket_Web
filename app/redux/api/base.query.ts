import { BaseQueryApi, FetchArgs, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { toast } from 'sonner';

const BASE_URL = process.env.NEXT_APP_API_URL;
const baseQuery = fetchBaseQuery({
  baseUrl: BASE_URL,
  prepareHeaders: (headers, { getState }) => {
    const token = localStorage.getItem(LocalStorage.TOKEN);
    if (token) {
      headers.set('Authorization', `Bearer ${token}`);
    }
    return headers;
  },
});

export const baseQueryWithReauth = async (args: string | FetchArgs, api: BaseQueryApi, extraOptions: {}) => {
  let result = await baseQuery(args, api, extraOptions);
  console.log(result)

  if (result.error && result.error.status === 401) {
    console.log(result.error)
    const refreshToken = localStorage.getItem(LocalStorage.REFRESH_TOKEN);

    if (!refreshToken) {
      toast.error("No refresh token available, logging out...");
      api.dispatch(logout());
      return result;
    }

    // Attempt token refresh
    const refreshResult = await baseQuery(
      {
        url: 'Auth/RefreshToken', // Your refresh token endpoint
        method: 'POST',
        body: { 
          RefreshToken: localStorage.getItem(LocalStorage.REFRESH_TOKEN),
          Token: localStorage.getItem(LocalStorage.TOKEN),
         },
      },
      api,
      extraOptions
    );

    if (refreshResult.data) {
      console.log("Token refresh successful, retrying request...");
      const refreshedData = refreshResult.data as { token: string; refreshToken: string }; // Explicitly type the response
      api.dispatch(setCredentials(refreshedData));

      localStorage.setItem("token", refreshedData.token);
      localStorage.setItem("refreshToken", refreshedData.refreshToken);
      // Retry the original request with new token
      result = await baseQuery(args, api, extraOptions);
    } else {
      console.log("Token refresh failed, logging out...");
      api.dispatch(logout());
    }
  }
  else if (result.error?.status === "FETCH_ERROR") {
    console.log("Network error: ", result.error);
    toast.error("Network error. Please check your internet connection.");
    return { error: { status: "NETWORK_ERROR", message: "Network error" } };
  }
  else if (result.error && typeof result.error.data === "string") {
    toast.error(result.error.data as string);
    return { error: { status: "BAD_REQUEST", message: result.error.data as string } };
  }
  else if(result.error ){
    return {error: {status: "UNKOWN_ERROR", data: result.error.data, message: "Unexpected error"}}
  }


  return result;
};