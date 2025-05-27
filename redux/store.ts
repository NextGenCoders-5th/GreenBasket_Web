'use client';
import { configureStore } from '@reduxjs/toolkit';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import authReducer from './slices/auth.slice';
import { userApi } from './api/user.api';
import { authApi } from './api/auth.api';
import vendorApi from './api/vendor.api';
import categoryApi from './api/category.api';
import cartItemApi from './api/cart-item.api';
import cartApi from './api/cart.api';
import addressApi from './api/address.api';
import productApi from './api/product.api';
import reviewApi from './api/review.api';
import orderApi from './api/order.api';
import paymentApi from './api/payment.api';



export const store = configureStore({
  reducer: {
    [userApi.reducerPath]: userApi.reducer,
    [authApi.reducerPath]: authApi.reducer,
    [vendorApi.reducerPath]: vendorApi.reducer,
    [categoryApi.reducerPath]: categoryApi.reducer,
    [productApi.reducerPath]: productApi.reducer,
    [cartItemApi.reducerPath]: cartItemApi.reducer,
    [addressApi.reducerPath]: addressApi.reducer,
    [reviewApi.reducerPath]: reviewApi.reducer,
    [paymentApi.reducerPath]: paymentApi.reducer,
    [orderApi.reducerPath]: orderApi.reducer,
    [cartApi.reducerPath]: cartApi.reducer,
    auth: authReducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware()
  .concat(userApi.middleware)
  .concat(authApi.middleware)
  .concat(vendorApi.middleware)
  .concat(categoryApi.middleware)
  .concat(productApi.middleware)
  .concat(cartItemApi.middleware)
  .concat(addressApi.middleware)
  .concat(reviewApi.middleware)
  .concat(orderApi.middleware)
  .concat(paymentApi.middleware)
  .concat(cartApi.middleware),
});

type RootState = ReturnType<typeof store.getState>;
type AppDispatch = typeof store.dispatch;

export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
