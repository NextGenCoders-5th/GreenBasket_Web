'use client';

import { Toaster } from 'sonner';
import { Provider } from 'react-redux';
import { store } from '../redux/store';

export default function ClientProviders({ children }: { children: React.ReactNode }) {
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
        theme='light'
      />
    </Provider>
  );
}
