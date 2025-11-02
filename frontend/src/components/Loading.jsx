import { Loader2 } from 'lucide-react';

const Loading = () => {
  return (
    <div className="flex items-center justify-center min-h-[400px]">
      <div className="text-center">
        <Loader2 className="animate-spin text-amber-500 mx-auto mb-4" size={48} />
        <p className="text-gray-400 text-lg">Loading movies...</p>
      </div>
    </div>
  );
};

export default Loading;
