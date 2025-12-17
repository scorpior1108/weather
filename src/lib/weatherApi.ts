import { WeatherData, SimpleWeatherData, ThreeDayForecast, WeatherApiResponse } from '@/types/weather';
import { format, addDays } from 'date-fns';

// 重新导出类型
export type { WeatherApiResponse, ThreeDayForecast, SimpleWeatherData };

// OpenWeatherMap API 配置
const API_KEY = process.env.NEXT_PUBLIC_OPENWEATHER_API_KEY || 'demo_key';
const BASE_URL = 'https://api.openweathermap.org/data/2.5';
const SHANGHAI_COORDS = { lat: 31.2304, lon: 121.4737 };

// 模拟数据，用于演示目的
const mockWeatherData: ThreeDayForecast = {
  today: {
    date: format(new Date(), 'yyyy-MM-dd'),
    dayName: '今天',
    tempMax: 28,
    tempMin: 22,
    condition: '晴朗',
    icon: 'sunny',
    humidity: 65,
    windSpeed: 12,
    precipitation: 0
  },
  tomorrow: {
    date: format(addDays(new Date(), 1), 'yyyy-MM-dd'),
    dayName: '明天',
    tempMax: 30,
    tempMin: 24,
    condition: '多云',
    icon: 'cloudy',
    humidity: 70,
    windSpeed: 15,
    precipitation: 20
  },
  dayAfterTomorrow: {
    date: format(addDays(new Date(), 2), 'yyyy-MM-dd'),
    dayName: '后天',
    tempMax: 26,
    tempMin: 21,
    condition: '小雨',
    icon: 'rainy',
    humidity: 85,
    windSpeed: 18,
    precipitation: 60
  }
};

// 获取当前天气
export async function getCurrentWeather(): Promise<WeatherApiResponse> {
  try {
    // 在实际应用中，这里会调用真实的 API
    // const response = await fetch(
    //   `${BASE_URL}/weather?lat=${SHANGHAI_COORDS.lat}&lon=${SHANGHAI_COORDS.lon}&appid=${API_KEY}&units=metric&lang=zh_cn`
    // );
    
    // if (!response.ok) {
    //   throw new Error(`HTTP error! status: ${response.status}`);
    // }
    
    // const data = await response.json();
    // return { success: true, data };
    
    // 模拟 API 调用延迟
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    return { 
      success: true, 
      data: mockWeatherData as any 
    };
  } catch (error) {
    console.error('获取当前天气失败:', error);
    return {
      success: false,
      error: {
        code: 500,
        message: '获取天气数据失败'
      }
    };
  }
}

// 获取三天天气预报
export async function getThreeDayForecast() {
  try {
    // 在实际应用中，这里会调用真实的 API
    // const response = await fetch(
    //   `${BASE_URL}/forecast?lat=${SHANGHAI_COORDS.lat}&lon=${SHANGHAI_COORDS.lon}&appid=${API_KEY}&units=metric&lang=zh_cn&cnt=24`
    // );
    
    // if (!response.ok) {
    //   throw new Error(`HTTP error! status: ${response.status}`);
    // }
    
    // const data = await response.json();
    // const processedData = processForecastData(data);
    // return { success: true, data: processedData };
    
    // 模拟 API 调用延迟
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    return { 
      success: true, 
      data: mockWeatherData 
    };
  } catch (error) {
    console.error('获取天气预报失败:', error);
    return {
      success: false,
      error: {
        code: 500,
        message: '获取天气预报失败'
      }
    };
  }
}

// 处理 OpenWeatherMap 数据格式
function processForecastData(data: any): ThreeDayForecast {
  const dailyData = data.list.reduce((acc: any[], item: any) => {
    const date = item.dt_txt.split(' ')[0];
    if (!acc[date]) {
      acc[date] = [];
    }
    acc[date].push(item);
    return acc;
  }, {});

  const dates = Object.keys(dailyData).slice(0, 3);
  const result: any = {};

  dates.forEach((date, index) => {
    const dayData = dailyData[date];
    const temps = dayData.map((item: any) => item.main.temp);
    const humidities = dayData.map((item: any) => item.main.humidity);
    const windSpeeds = dayData.map((item: any) => item.wind.speed);
    const precipitations = dayData.map((item: any) => item.pop * 100);

    const dayNames = ['今天', '明天', '后天'];
    
    result[index === 0 ? 'today' : index === 1 ? 'tomorrow' : 'dayAfterTomorrow'] = {
      date,
      dayName: dayNames[index],
      tempMax: Math.max(...temps),
      tempMin: Math.min(...temps),
      condition: getWeatherDescription(dayData[Math.floor(dayData.length / 2)].weather[0].description),
      icon: dayData[Math.floor(dayData.length / 2)].weather[0].main.toLowerCase(),
      humidity: Math.round(humidities.reduce((a: number, b: number) => a + b, 0) / humidities.length),
      windSpeed: Math.round(windSpeeds.reduce((a: number, b: number) => a + b, 0) / windSpeeds.length),
      precipitation: Math.round(precipitations.reduce((a: number, b: number) => a + b, 0) / precipitations.length)
    };
  });

  return result;
}

// 获取天气描述的中文翻译
function getWeatherDescription(description: string): string {
  const descriptions: { [key: string]: string } = {
    'clear sky': '晴朗',
    'few clouds': '少云',
    'scattered clouds': '多云',
    'broken clouds': '阴天',
    'shower rain': '阵雨',
    'rain': '雨',
    'thunderstorm': '雷雨',
    'snow': '雪',
    'mist': '薄雾'
  };
  
  return descriptions[description.toLowerCase()] || description;
}

// 获取天气图标 URL
export function getWeatherIconUrl(iconCode: string): string {
  // 使用 OpenWeatherMap 的图标
  return `https://openweathermap.org/img/wn/${iconCode}@2x.png`;
}

// 获取本地化的天气图标
export function getLocalWeatherIcon(condition: string): string {
  const icons: { [key: string]: string } = {
    'sunny': '☀️',
    'cloudy': '☁️',
    'rainy': '🌧️',
    'stormy': '⛈️',
    'snowy': '❄️',
    'foggy': '🌫️',
    'windy': '💨',
    'partly-cloudy': '⛅'
  };
  
  return icons[condition.toLowerCase()] || '🌤️';
}

// 格式化温度
export function formatTemperature(temp: number, unit: 'C' | 'F' = 'C'): string {
  if (unit === 'F') {
    return `${Math.round(temp * 9/5 + 32)}°F`;
  }
  return `${Math.round(temp)}°C`;
}

// 格式化风速
export function formatWindSpeed(speed: number): string {
  return `${speed} km/h`;
}

// 格式化湿度
export function formatHumidity(humidity: number): string {
  return `${humidity}%`;
}

// 格式化降水概率
export function formatPrecipitation(precipitation: number): string {
  return `${precipitation}%`;
}