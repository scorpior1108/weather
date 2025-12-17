import { SimpleWeatherData } from '@/types/weather';
import { formatTemperature, formatWindSpeed, formatHumidity, formatPrecipitation, getLocalWeatherIcon } from '@/lib/weatherApi';
import { Cloud, Droplets, Eye, Gauge, Wind, MapPin } from 'lucide-react';

interface WeatherCardProps {
  weatherData: SimpleWeatherData;
  isToday?: boolean;
}

export default function WeatherCard({ weatherData, isToday = false }: WeatherCardProps) {
  const { date, dayName, tempMax, tempMin, condition, icon, humidity, windSpeed, precipitation } = weatherData;

  // 根据天气状况获取背景颜色
  const getBackgroundClass = (condition: string) => {
    const conditionLower = condition.toLowerCase();
    if (conditionLower.includes('晴') || conditionLower.includes('sunny')) {
      return 'bg-gradient-to-br from-blue-400 to-blue-600';
    } else if (conditionLower.includes('云') || conditionLower.includes('cloudy')) {
      return 'bg-gradient-to-br from-gray-400 to-gray-600';
    } else if (conditionLower.includes('雨') || conditionLower.includes('rain')) {
      return 'bg-gradient-to-br from-slate-500 to-slate-700';
    } else if (conditionLower.includes('雪') || conditionLower.includes('snow')) {
      return 'bg-gradient-to-br from-gray-200 to-gray-400';
    } else {
      return 'bg-gradient-to-br from-blue-400 to-blue-600';
    }
  };

  return (
    <div className={`
      relative overflow-hidden rounded-2xl p-6 text-white shadow-xl
      transform transition-all duration-300 hover:scale-105 hover:shadow-2xl
      ${getBackgroundClass(condition)}
      ${isToday ? 'ring-4 ring-white ring-opacity-50' : ''}
    `}>
      {/* 今天的标记 */}
      {isToday && (
        <div className="absolute top-4 right-4 bg-white bg-opacity-20 backdrop-blur-sm rounded-full px-3 py-1 text-sm font-medium">
          今天
        </div>
      )}

      {/* 主要天气信息 */}
      <div className="flex flex-col h-full">
        {/* 日期和星期 */}
        <div className="mb-4">
          <h3 className="text-2xl font-bold mb-1">{dayName}</h3>
          <p className="text-white text-opacity-90 text-sm">{date}</p>
        </div>

        {/* 天气图标和温度 */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-4">
            <div className="text-5xl">
              {getLocalWeatherIcon(icon)}
            </div>
            <div>
              <p className="text-4xl font-bold">{formatTemperature(tempMax)}</p>
              <p className="text-white text-opacity-90">{formatTemperature(tempMin)}</p>
            </div>
          </div>
        </div>

        {/* 天气状况 */}
        <div className="mb-6">
          <p className="text-xl font-medium mb-4">{condition}</p>
        </div>

        {/* 详细信息 */}
        <div className="grid grid-cols-2 gap-4 text-sm">
          <div className="flex items-center space-x-2">
            <Droplets className="w-4 h-4 text-white text-opacity-80" />
            <span className="text-white text-opacity-90">湿度</span>
            <span className="font-medium">{formatHumidity(humidity)}</span>
          </div>
          
          <div className="flex items-center space-x-2">
            <Wind className="w-4 h-4 text-white text-opacity-80" />
            <span className="text-white text-opacity-90">风速</span>
            <span className="font-medium">{formatWindSpeed(windSpeed)}</span>
          </div>
          
          <div className="flex items-center space-x-2">
            <Cloud className="w-4 h-4 text-white text-opacity-80" />
            <span className="text-white text-opacity-90">降水</span>
            <span className="font-medium">{formatPrecipitation(precipitation)}</span>
          </div>
          
          <div className="flex items-center space-x-2">
            <MapPin className="w-4 h-4 text-white text-opacity-80" />
            <span className="text-white text-opacity-90">上海</span>
          </div>
        </div>
      </div>

      {/* 装饰性背景元素 */}
      <div className="absolute top-0 right-0 w-32 h-32 bg-white bg-opacity-10 rounded-full -mr-16 -mt-16"></div>
      <div className="absolute bottom-0 left-0 w-24 h-24 bg-white bg-opacity-10 rounded-full -ml-12 -mb-12"></div>
    </div>
  );
}

// 天气详情组件
export function WeatherDetails({ weatherData }: { weatherData: SimpleWeatherData }) {
  return (
    <div className="bg-white rounded-xl p-6 shadow-lg">
      <h3 className="text-lg font-semibold text-gray-800 mb-4">天气详情</h3>
      
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Gauge className="w-5 h-5 text-gray-600" />
            <span className="text-gray-600">最高温度</span>
          </div>
          <span className="font-medium text-gray-800">{formatTemperature(weatherData.tempMax)}</span>
        </div>
        
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Gauge className="w-5 h-5 text-gray-600" />
            <span className="text-gray-600">最低温度</span>
          </div>
          <span className="font-medium text-gray-800">{formatTemperature(weatherData.tempMin)}</span>
        </div>
        
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Droplets className="w-5 h-5 text-gray-600" />
            <span className="text-gray-600">湿度</span>
          </div>
          <span className="font-medium text-gray-800">{formatHumidity(weatherData.humidity)}</span>
        </div>
        
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Wind className="w-5 h-5 text-gray-600" />
            <span className="text-gray-600">风速</span>
          </div>
          <span className="font-medium text-gray-800">{formatWindSpeed(weatherData.windSpeed)}</span>
        </div>
        
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Cloud className="w-5 h-5 text-gray-600" />
            <span className="text-gray-600">降水概率</span>
          </div>
          <span className="font-medium text-gray-800">{formatPrecipitation(weatherData.precipitation)}</span>
        </div>
      </div>
    </div>
  );
}