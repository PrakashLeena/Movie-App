import { AlertCircle } from 'lucide-react';

const ErrorMessage = ({ message }) => {
  return (
    <div className="flex items-center justify-center min-h-[400px]">
      <div className="bg-red-500/10 border border-red-500 rounded-lg p-6 max-w-md">
        <div className="flex items-center space-x-3 text-red-500 mb-2">
          <AlertCircle size={24} />
          <h3 className="text-lg font-semibold">Error</h3>
        </div>
        <p className="text-gray-300">{message}</p>
      </div>
    </div>
  );
};

export default ErrorMessage;
