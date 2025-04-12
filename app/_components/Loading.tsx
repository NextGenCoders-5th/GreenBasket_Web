

const LoadingPage = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="text-center">
        {/* Loading Indicator */}
        <div className="mb-6">
          <div className="w-16 h-16 border-4 border-t-4 border-blue-500 rounded-full animate-spin"></div>
        </div>
        {/* Loading Text */}
        <p className="text-xl font-semibold text-gray-700">Loading...</p>
      </div>
    </div>
  );
};

export default LoadingPage;
