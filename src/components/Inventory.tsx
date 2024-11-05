import React from 'react';
import { GanttChart, Coins, Sprout, Trophy } from 'lucide-react';
import { CropType, CROPS } from '../types/game';

interface InventoryProps {
  seeds: Record<CropType, number>;
  coins: number;
  crops: Record<CropType, number>;
  level: number;
  xp: number;
  nextLevelXp: number;
  selectedCrop: CropType;
  onSelectCrop: (crop: CropType) => void;
  onBuySeeds: (type: CropType) => void;
  onSellCrops: (type: CropType) => void;
}

export function Inventory({
  seeds,
  coins,
  crops,
  level,
  xp,
  nextLevelXp,
  selectedCrop,
  onSelectCrop,
  onBuySeeds,
  onSellCrops,
}: InventoryProps) {
  return (
    <div className="bg-white p-4 rounded-lg shadow-lg space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <Trophy className="text-yellow-500" />
            <span className="font-medium">Level {level}</span>
          </div>
          <div className="w-32 h-2 bg-gray-200 rounded-full overflow-hidden">
            <div
              className="h-full bg-yellow-500 transition-all duration-300"
              style={{ width: `${(xp / nextLevelXp) * 100}%` }}
            />
          </div>
          <div className="flex items-center gap-2">
            <Coins className="text-yellow-500" />
            <span className="font-medium">{coins}</span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-4 gap-4">
        {Object.entries(CROPS).map(([type, data]) => {
          const cropType = type as CropType;
          const isUnlocked = level >= data.minLevel;
          
          return (
            <div
              key={type}
              className={`p-3 rounded-lg ${
                selectedCrop === type ? 'bg-green-100' : 'bg-gray-50'
              } ${!isUnlocked ? 'opacity-50' : ''}`}
            >
              <div className="flex justify-between items-center mb-2">
                <span className="font-medium">{data.name}</span>
                {!isUnlocked && <span className="text-xs">Level {data.minLevel}</span>}
              </div>
              
              <div className="flex justify-between items-center mb-2">
                <div className="flex items-center gap-1">
                  <Sprout className="text-green-600" size={16} />
                  <span>{seeds[cropType]}</span>
                </div>
                <div className="flex items-center gap-1">
                  <GanttChart className="text-amber-600" size={16} />
                  <span>{crops[cropType]}</span>
                </div>
              </div>

              <div className="space-y-2">
                <button
                  onClick={() => isUnlocked && onSelectCrop(cropType)}
                  className={`w-full px-2 py-1 text-sm rounded ${
                    selectedCrop === type
                      ? 'bg-green-500 text-white'
                      : 'bg-green-100 text-green-700'
                  } hover:bg-green-600 hover:text-white disabled:opacity-50 disabled:cursor-not-allowed transition-colors`}
                  disabled={!isUnlocked}
                >
                  Select
                </button>
                
                <button
                  onClick={() => onBuySeeds(cropType)}
                  disabled={!isUnlocked || coins < data.seedPrice}
                  className="w-full px-2 py-1 text-sm bg-blue-100 text-blue-700 rounded hover:bg-blue-600 hover:text-white disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  Buy ({data.seedPrice})
                </button>
                
                <button
                  onClick={() => onSellCrops(cropType)}
                  disabled={!isUnlocked || crops[cropType] === 0}
                  className="w-full px-2 py-1 text-sm bg-amber-100 text-amber-700 rounded hover:bg-amber-600 hover:text-white disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  Sell ({data.sellPrice})
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}