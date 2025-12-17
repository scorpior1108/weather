'use client';

import { useWeatherData } from '@/hooks/useWeatherData';
import WeatherCard from '@/components/WeatherCard';
import { ErrorBoundary, NetworkError } from '@/components/ErrorBoundary';
import LoadingSpinner, { WeatherCardSkeleton } from '@/components/LoadingSpinner';
import { Cloud, MapPin, RefreshCw } from 'lucide-react';

export default function Home() {
  const { weatherData, isLoading, isError, error, mutate } = useWeatherData();

  const handleRefresh = () => {
    mutate();
  };

  return (
    <ErrorBoundary>
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
        {/* 头部 */}
        <header className="bg-white shadow-sm">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <Cloud className="w-8 h-8 text-blue-500" />
                <h1 className="text-2xl font-bold text-gray-900">上海天气预报</h1>
                <div className="flex items-center space-x-1 text-gray-600">
                  <MapPin className="w-4 h-4" />
                  <span className="text-sm">上海市</span>
                </div>
              </div>
              
              <button
                onClick={handleRefresh}
                className="flex items-center space-x-2 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors disabled:opacity-50"
                disabled={isLoading}
              >
                <RefreshCw className={`w-4 h-4 ${isLoading ? 'animate-spin' : ''}`} />
                <span>刷新</span>
              </button>
            </div>
          </div>
        </header>

        {/* 主要内容 */}
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          {isLoading && (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <WeatherCardSkeleton />
              <WeatherCardSkeleton />
              <WeatherCardSkeleton />
            </div>
          )}

          {isError && (
            <NetworkError onRetry={handleRefresh} />
          )}

          {weatherData && !isLoading && !isError && (
            <div className="space-y-8">
              {/* 天气卡片网格 */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <WeatherCard 
                  weatherData={weatherData.today} 
                  isToday={true} 
                />
                <WeatherCard 
                  weatherData={weatherData.tomorrow} 
                />
                <WeatherCard 
                  weatherData={weatherData.dayAfterTomorrow} 
                />
              </div>

              {/* 额外信息区域 */}
              <div className="bg-white rounded-xl shadow-lg p-6">
                <h2 className="text-xl font-semibold text-gray-800 mb-4">天气概览</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="text-center">
                    <h3 className="text-lg font-medium text-gray-700 mb-2">今天</h3>
                    <p className="text-gray-600">{weatherData.today.condition}</p>
                    <p className="text-2xl font-bold text-gray-900 mt-2">
                      {weatherData.today.tempMax}° / {weatherData.today.tempMin}°
                    </p>
                  </div>
                  <div className="text-center">
                    <h3 className="text-lg font-medium text-gray-700 mb-2">明天</h3>
                    <p className="text-gray-600">{weatherData.tomorrow.condition}</p>
                    <p className="text-2xl font-bold text-gray-900 mt-2">
                      {weatherData.tomorrow.tempMax}° / {weatherData.tomorrow.tempMin}°
                    </p>
                  </div>
                  <div className="text-center">
                    <h3 className="text-lg font-medium text-gray-700 mb-2">后天</h3>
                    <p className="text-gray-600">{weatherData.dayAfterTomorrow.condition}</p>
                    <p className="text-2xl font-bold text-gray-900 mt-2">
                      {weatherData.dayAfterTomorrow.tempMax}° / {weatherData.dayAfterTomorrow.tempMin}°
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}
        </main>

        {/* 页脚 */}
        <footer className="bg-white border-t border-gray-200 mt-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
            <div className="text-center text-gray-500 text-sm">
              <p>© 2024 上海天气预报. 数据来源于模拟API.</p>
            </div>
          </div>
        </footer>
      </div>
    </ErrorBoundary>
  );
}
