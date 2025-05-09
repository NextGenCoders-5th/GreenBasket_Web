'use client';
import { configureStore } from '@reduxjs/toolkit';
import { userApi } from './api/user.api';
import { authApi } from './api/auth.api';
import vendorApi from './api/vendor.api';
import categoryApi from './api/category.api';
import authReducer from './slices/auth.slice';
import productApi from './api/product.api';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';

export const store = configureStore({
  reducer: {
    [userApi.reducerPath]: userApi.reducer,
    [authApi.reducerPath]: authApi.reducer,
    [vendorApi.reducerPath]: vendorApi.reducer,
    [categoryApi.reducerPath]: categoryApi.reducer,
    [productApi.reducerPath]: productApi.reducer,
    auth: authReducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware()
  .concat(userApi.middleware)
  .concat(authApi.middleware)
  .concat(vendorApi.middleware)
  .concat(categoryApi.middleware)
  .concat(productApi.middleware),
});

type RootState = ReturnType<typeof store.getState>;
type AppDispatch = typeof store.dispatch;

export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
