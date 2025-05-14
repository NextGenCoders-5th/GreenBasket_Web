import { Loader2 } from 'lucide-react';

const LoadingPage = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="text-center">
        <div className="mb-6">
          <Loader2 strokeWidth={1} className="w-16 h-16  text-accent-500 animate-spin" />
        </div>
      </div>
    </div>
  );
};

export default LoadingPage;
