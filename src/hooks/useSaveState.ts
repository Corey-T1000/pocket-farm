import { useEffect } from 'react';
import { Plot, CropType } from '../types/game';

interface GameState {
  plots: Plot[];
  inventory: {
    seeds: Record<CropType, number>;
    crops: Record<CropType, number>;
    coins: number;
    level: number;
    xp: number;
    nextLevelXp: number;
  };
  achievements: string[];
  harvestedCrops: number;
  hadPerfectWeather: boolean;
}

const SAVE_KEY = 'pixel_farm_save';

export function useSaveState() {
  const loadState = (): GameState | null => {
    const saved = localStorage.getItem(SAVE_KEY);
    if (saved) {
      return JSON.parse(saved);
    }
    return null;
  };

  const saveState = (state: GameState) => {
    localStorage.setItem(SAVE_KEY, JSON.stringify(state));
  };

  return { loadState, saveState };
}