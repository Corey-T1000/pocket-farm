import React from 'react';
import { Cloud, Sun, CloudRain, Sparkles } from 'lucide-react';
import { WeatherType } from '../types/game';

interface WeatherProps {
  currentWeather: WeatherType;
  timeUntilChange: number;
}

const WEATHER_ICONS = {
  sunny: Sun,
  rainy: CloudRain,
  drought: Cloud,
  perfect: Sparkles
};

const WEATHER_COLORS = {
  sunny: 'text-yellow-500',
  rainy: 'text-blue-500',
  drought: 'text-orange-500',
  perfect: 'text-purple-500'
};

const WEATHER_DESCRIPTIONS = {
  sunny: 'Normal growth for all crops',
  rainy: 'Bonus growth for root vegetables',
  drought: 'Reduced growth for all crops',
  perfect: 'Bonus growth for all crops!'
};

export function Weather({ currentWeather, timeUntilChange }: WeatherProps) {
  const Icon = WEATHER_ICONS[currentWeather];
  const color = WEATHER_COLORS[currentWeather];
  
  return (
    <div className="bg-white/90 p-4 rounded-lg shadow-lg">
      <div className="flex items-center gap-4">
        <div className={`${color} animate-pulse`}>
          <Icon size={32} />
        </div>
        <div>
          <h3 className="font-semibold capitalize">{currentWeather} Weather</h3>
          <p className="text-sm text-gray-600">{WEATHER_DESCRIPTIONS[currentWeather]}</p>
          <p className="text-xs text-gray-500">Changes in: {timeUntilChange}s</p>
        </div>
      </div>
    </div>
  );
}