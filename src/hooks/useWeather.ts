import { useState, useEffect } from 'react';
import { WeatherType } from '../types/game';

const WEATHER_DURATION = 60; // seconds
const WEATHER_TYPES: WeatherType[] = ['sunny', 'rainy', 'drought', 'perfect'];

export function useWeather() {
  const [currentWeather, setCurrentWeather] = useState<WeatherType>('sunny');
  const [timeUntilChange, setTimeUntilChange] = useState(WEATHER_DURATION);

  useEffect(() => {
    const interval = setInterval(() => {
      setTimeUntilChange(time => {
        if (time <= 1) {
          const currentIndex = WEATHER_TYPES.indexOf(currentWeather);
          const nextIndex = (currentIndex + 1) % WEATHER_TYPES.length;
          setCurrentWeather(WEATHER_TYPES[nextIndex]);
          return WEATHER_DURATION;
        }
        return time - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [currentWeather]);

  return { currentWeather, timeUntilChange };
}