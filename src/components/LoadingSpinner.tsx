import { Loader2 } from 'lucide-react';

interface LoadingSpinnerProps {
  size?: 'small' | 'medium' | 'large';
  message?: string;
}

export default function LoadingSpinner({ size = 'medium', message = '加载中...' }: LoadingSpinnerProps) {
  const sizeClasses = {
    small: 'w-4 h-4',
    medium: 'w-8 h-8',
    large: 'w-12 h-12'
  };

  return (
    <div className="flex flex-col items-center justify-center p-8">
      <Loader2 className={`animate-spin text-blue-500 ${sizeClasses[size]}`} />
      {message && (
        <p className="mt-4 text-gray-600 text-sm">{message}</p>
      )}
    </div>
  );
}

// 骨架屏加载组件
export function WeatherCardSkeleton() {
  return (
    <div className="bg-gray-200 rounded-2xl p-6 animate-pulse">
      <div className="flex justify-between items-start mb-4">
        <div>
          <div className="h-6 bg-gray-300 rounded w-20 mb-2"></div>
          <div className="h-4 bg-gray-300 rounded w-24"></div>
        </div>
        <div className="h-6 bg-gray-300 rounded-full w-16"></div>
      </div>
      
      <div className="flex items-center space-x-4 mb-6">
        <div className="w-16 h-16 bg-gray-300 rounded-full"></div>
        <div>
          <div className="h-8 bg-gray-300 rounded w-16 mb-2"></div>
          <div className="h-6 bg-gray-300 rounded w-12"></div>
        </div>
      </div>
      
      <div className="h-6 bg-gray-300 rounded w-24 mb-6"></div>
      
      <div className="grid grid-cols-2 gap-4">
        <div className="h-4 bg-gray-300 rounded"></div>
        <div className="h-4 bg-gray-300 rounded"></div>
        <div className="h-4 bg-gray-300 rounded"></div>
        <div className="h-4 bg-gray-300 rounded"></div>
      </div>
    </div>
  );
}