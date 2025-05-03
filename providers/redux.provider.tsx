'use client';

import { store } from '@/redux/store';
import { Provider } from 'react-redux';
import { Toaster } from 'sonner';
import AuthProvider from './auth.provider';

export default function ReduxProvider({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <Provider store={store}>
      <Toaster
        position="top-right"
        toastOptions={{
          duration: 5000,
          classNames: {
            toast: "border-l-4 border-green-600 bg-green-100 text-gray-800",
            error: "border-red-600 text-red-700",
            success: "border-green-600 text-green-700",
            info: "border-blue-600 text-blue-700",
            warning: "border-yellow-600 text-yellow-700",
            loading: "border-blue-600 text-blue-700",
            default: "border-gray-600 text-gray-700",
          },
          
        }}
        closeButton={true}
        theme="light"
      />
      <AuthProvider>
        {children}
      </AuthProvider>
    </Provider>
  );
}
