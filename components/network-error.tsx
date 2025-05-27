'use client'
import { useEffect } from 'react';
import { AlertTriangle } from 'lucide-react';
import { ResponseError } from '@/types/general.types';



interface NetworkErrorSectionProps {
  error: ResponseError | any;
}
export default function NetworkErrorSection({error}: NetworkErrorSectionProps) {
  // Reload page when connection is restored
  useEffect(() => {
    const handleOnline = () => {
      window.location.reload();
    };

    window.addEventListener('online', handleOnline);

    return () => {
      window.removeEventListener('online', handleOnline);
    };
  }, []);

  return (
    <div className="flex flex-col items-center justify-center w-full min-h-full h-screen bg-red-50 border border-red-200 rounded-lg p-6 text-center shadow-sm">
      <AlertTriangle className="w-12 h-12 text-red-500 mb-4" />
      <h2 className="text-lg sm:text-xl font-semibold text-red-700 mb-2">Error: {error.status}</h2>
      <p className="text-sm text-red-600 max-w-sm mb-4">
        {error.message || 'An unexpected error occurred. Please check your network connection and try again.'}
      </p>
      <button
        onClick={() => window.location.reload()}
        className="inline-flex items-center px-4 py-2 bg-red-600 text-white font-medium rounded-md hover:bg-red-700 transition"
      >
        Retry
      </button>
    </div>
  );
}
