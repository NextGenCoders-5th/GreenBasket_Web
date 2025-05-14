import { Loader, Loader2, LoaderCircle } from 'lucide-react';

const LoadingPage = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="text-center">
        {/* Loading Indicator */}
        <div className="mb-6">
          <LoaderCircle
            strokeWidth={1}
            className="w-16 h-16 text-accent-500 animate-spin"
            />
          {/* <div className="w-16 h-16  border-t-2 border-accent-500 rounded-full animate-spin"></div> */}
        </div>
        {/* Loading Text */}
        {/* <p className="text-xl font-semibold text-gray-700">Loading...</p> */}
      </div>
    </div>
  );
};

export default LoadingPage;
