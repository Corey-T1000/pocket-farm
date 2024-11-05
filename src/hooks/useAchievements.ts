import { useState, useEffect } from 'react';
import { ACHIEVEMENTS } from '../types/game';

export function useAchievements() {
  const [unlockedAchievements, setUnlockedAchievements] = useState<Set<string>>(new Set());
  const [harvestedCrops, setHarvestedCrops] = useState(0);
  const [hadPerfectWeather, setHadPerfectWeather] = useState(false);

  const initializeAchievements = (achievements: Set<string>) => {
    setUnlockedAchievements(achievements);
  };

  const checkAchievements = () => {
    const newUnlocked = new Set(unlockedAchievements);
    let coinsEarned = 0;

    if (harvestedCrops >= 1 && !newUnlocked.has('first_harvest')) {
      newUnlocked.add('first_harvest');
      coinsEarned += 50;
    }

    if (harvestedCrops >= 100 && !newUnlocked.has('master_farmer')) {
      newUnlocked.add('master_farmer');
      coinsEarned += 500;
    }

    if (hadPerfectWeather && !newUnlocked.has('weather_master')) {
      newUnlocked.add('weather_master');
      coinsEarned += 200;
    }

    if (coinsEarned > 0) {
      setUnlockedAchievements(newUnlocked);
    }

    return coinsEarned;
  };

  return {
    achievements: ACHIEVEMENTS,
    unlockedAchievements,
    checkAchievements,
    setHarvestedCrops,
    setHadPerfectWeather,
    initializeAchievements,
    harvestedCrops,
    hadPerfectWeather
  };
}