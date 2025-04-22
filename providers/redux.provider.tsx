'use client';

import { store } from '@/redux/store';
import { Provider } from 'react-redux';
import { Toaster } from 'sonner';

export default function ReduxProvider({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <Provider store={store}>
      {children}
      <Toaster
        position="top-right"
        toastOptions={{
          duration: 5000,
          style: {
            background: '#333',
            color: '#fff',
          },
        }}
        closeButton={true}
        theme="light"
      />
    </Provider>
  );
}
