import useSWR from 'swr';
import { getThreeDayForecast, ThreeDayForecast } from '@/lib/weatherApi';

// 定义响应类型
type ThreeDayForecastResponse = {
  success: boolean;
  error?: {
    code: number;
    message: string;
  };
  data?: ThreeDayForecast;
};

// SWR fetcher 函数
const fetcher = async (): Promise<ThreeDayForecastResponse> => {
  return await getThreeDayForecast();
};

// 天气数据 hook
export function useWeatherData() {
  const { data, error, isLoading, mutate } = useSWR<ThreeDayForecastResponse>(
    'weather-forecast',
    fetcher,
    {
      revalidateOnFocus: false,
      revalidateOnReconnect: true,
      refreshInterval: 10 * 60 * 1000, // 10分钟刷新一次
      errorRetryCount: 3,
      errorRetryInterval: 5000,
    }
  );

  return {
    weatherData: data?.data,
    isLoading,
    isError: !!error,
    error,
    mutate
  };
}

// 获取特定日期的天气数据
export function useDayWeather(day: 'today' | 'tomorrow' | 'dayAfterTomorrow') {
  const { weatherData, isLoading, isError, error } = useWeatherData();
  
  const dayData = weatherData?.[day];
  
  return {
    dayData,
    isLoading,
    isError,
    error
  };
}

// 本地存储 hook
export function useLocalStorage<T>(key: string, initialValue: T) {
  // 获取初始值
  const getStoredValue = (): T => {
    if (typeof window === 'undefined') {
      return initialValue;
    }
    
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      console.error(`Error reading localStorage key "${key}":`, error);
      return initialValue;
    }
  };

  // 设置值
  const setStoredValue = (value: T | ((val: T) => T)) => {
    try {
      const valueToStore = value instanceof Function ? value(getStoredValue()) : value;
      if (typeof window !== 'undefined') {
        window.localStorage.setItem(key, JSON.stringify(valueToStore));
      }
      window.dispatchEvent(new Event('local-storage'));
    } catch (error) {
      console.error(`Error setting localStorage key "${key}":`, error);
    }
  };

  return [getStoredValue(), setStoredValue] as const;
}