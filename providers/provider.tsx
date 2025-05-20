'use client';

import { store } from '@/redux/store';
import { Provider } from 'react-redux';
import { Toaster } from 'sonner';
import AuthProvider from './auth.provider';
import { ToastProvider } from './toast.provider';

export default function ReduxProvider({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <Provider store={store}>
      <Toaster
        position="top-right"
        theme="light"
        closeButton
        toastOptions={{
          classNames: {
            toast: 'shadow-none p-0 bg-transparent border-none', // Remove default styles completely
          },
        }}
      />

      <ToastProvider

      >
        <AuthProvider>{children}</AuthProvider>

      </ToastProvider>
    </Provider>
  );
}
