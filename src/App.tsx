import React, { useState, useEffect } from 'react';
import { Tile } from './components/Tile';
import { Inventory } from './components/Inventory';
import { Weather } from './components/Weather';
import { Achievements } from './components/Achievements';
import { Plot, CropType, CROPS } from './types/game';
import { useWeather } from './hooks/useWeather';
import { useAchievements } from './hooks/useAchievements';
import { useSaveState } from './hooks/useSaveState';
import { Trophy } from 'lucide-react';

function App() {
  const { loadState, saveState } = useSaveState();
  
  const [plots, setPlots] = useState<Plot[]>(() => {
    const saved = loadState();
    return saved?.plots || Array(16).fill({ state: 'empty', growthProgress: 0 });
  });
  
  const [selectedCrop, setSelectedCrop] = useState<CropType>('carrot');
  const [showAchievements, setShowAchievements] = useState(false);
  
  const [inventory, setInventory] = useState(() => {
    const saved = loadState();
    return saved?.inventory || {
      seeds: Object.fromEntries(
        Object.keys(CROPS).map(crop => [crop, crop === 'carrot' ? 5 : 0])
      ) as Record<CropType, number>,
      crops: Object.fromEntries(
        Object.keys(CROPS).map(crop => [crop, 0])
      ) as Record<CropType, number>,
      coins: 100,
      level: 1,
      xp: 0,
      nextLevelXp: 100,
    };
  });

  const { currentWeather, timeUntilChange } = useWeather();
  const {
    achievements,
    unlockedAchievements,
    checkAchievements,
    setHarvestedCrops,
    setHadPerfectWeather,
    initializeAchievements,
    harvestedCrops,
    hadPerfectWeather
  } = useAchievements();

  // Initialize achievements from save
  useEffect(() => {
    const saved = loadState();
    if (saved) {
      initializeAchievements(new Set(saved.achievements));
      setHarvestedCrops(saved.harvestedCrops || 0);
      setHadPerfectWeather(saved.hadPerfectWeather || false);
    }
  }, []);

  // Save state whenever important data changes
  useEffect(() => {
    const state = {
      plots,
      inventory,
      achievements: Array.from(unlockedAchievements),
      harvestedCrops,
      hadPerfectWeather,
    };
    saveState(state);
  }, [plots, inventory, unlockedAchievements, harvestedCrops, hadPerfectWeather]);

  useEffect(() => {
    const growthInterval = setInterval(() => {
      setPlots(currentPlots =>
        currentPlots.map(plot => {
          if (plot.state === 'growing' && plot.cropType) {
            const crop = CROPS[plot.cropType];
            const weatherMultiplier = crop.weatherBonus[currentWeather];
            const growthIncrement = (1 / crop.growthTime) * weatherMultiplier;
            const newProgress = plot.growthProgress + growthIncrement;

            if (newProgress >= 1) {
              return { ...plot, state: 'ready', growthProgress: 1 };
            }
            return { ...plot, growthProgress: newProgress, weatherBonus: weatherMultiplier };
          }
          return plot;
        })
      );
    }, 1000);

    return () => clearInterval(growthInterval);
  }, [currentWeather]);

  const addXp = (amount: number) => {
    setInventory(curr => {
      const newXp = curr.xp + amount;
      if (newXp >= curr.nextLevelXp) {
        return {
          ...curr,
          level: curr.level + 1,
          xp: newXp - curr.nextLevelXp,
          nextLevelXp: Math.floor(curr.nextLevelXp * 1.5),
        };
      }
      return { ...curr, xp: newXp };
    });
  };

  const handleTileClick = (index: number) => {
    const plot = plots[index];
    
    if (plot.state === 'empty' && inventory.seeds[selectedCrop] > 0) {
      setPlots(current =>
        current.map((p, i) =>
          i === index
            ? {
                state: 'growing',
                cropType: selectedCrop,
                growthProgress: 0,
                weatherBonus: CROPS[selectedCrop].weatherBonus[currentWeather]
              }
            : p
        )
      );
      setInventory(curr => ({
        ...curr,
        seeds: {
          ...curr.seeds,
          [selectedCrop]: curr.seeds[selectedCrop] - 1,
        },
      }));
      addXp(1);
    } else if (plot.state === 'ready' && plot.cropType) {
      setPlots(current =>
        current.map((p, i) =>
          i === index ? { state: 'empty', growthProgress: 0 } : p
        )
      );
      setInventory(curr => ({
        ...curr,
        crops: {
          ...curr.crops,
          [plot.cropType!]: curr.crops[plot.cropType!] + 1,
        },
      }));
      setHarvestedCrops(prev => prev + 1);
      if (plot.weatherBonus && plot.weatherBonus > 1.4) {
        setHadPerfectWeather(true);
      }
      const achievementCoins = checkAchievements();
      addXp(2);
      if (achievementCoins > 0) {
        setInventory(curr => ({
          ...curr,
          coins: curr.coins + achievementCoins
        }));
      }
    }
  };

  const handleBuySeeds = (cropType: CropType) => {
    const price = CROPS[cropType].seedPrice;
    if (inventory.coins >= price) {
      setInventory(curr => ({
        ...curr,
        seeds: {
          ...curr.seeds,
          [cropType]: curr.seeds[cropType] + 1,
        },
        coins: curr.coins - price,
      }));
    }
  };

  const handleSellCrops = (cropType: CropType) => {
    const count = inventory.crops[cropType];
    if (count > 0) {
      const sellPrice = CROPS[cropType].sellPrice;
      setInventory(curr => ({
        ...curr,
        crops: {
          ...curr.crops,
          [cropType]: 0,
        },
        coins: curr.coins + (count * sellPrice),
      }));
      addXp(count * 3);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-100 to-green-200 p-8">
      <div className="max-w-4xl mx-auto space-y-8">
        <div className="flex justify-between items-start">
          <div className="text-center">
            <h1 className="text-4xl font-bold text-green-800 mb-2">Pixel Farm</h1>
            <p className="text-green-600">Grow your virtual farm!</p>
          </div>
          <button
            onClick={() => setShowAchievements(true)}
            className="bg-yellow-100 p-2 rounded-lg hover:bg-yellow-200 transition-colors"
          >
            <Trophy className="text-yellow-600" />
          </button>
        </div>

        <Weather
          currentWeather={currentWeather}
          timeUntilChange={timeUntilChange}
        />

        <Inventory
          seeds={inventory.seeds}
          crops={inventory.crops}
          coins={inventory.coins}
          level={inventory.level}
          xp={inventory.xp}
          nextLevelXp={inventory.nextLevelXp}
          selectedCrop={selectedCrop}
          onSelectCrop={setSelectedCrop}
          onBuySeeds={handleBuySeeds}
          onSellCrops={handleSellCrops}
        />

        <div className="grid grid-cols-4 gap-4 bg-green-50 p-6 rounded-xl shadow-xl">
          {plots.map((plot, index) => (
            <Tile
              key={index}
              plot={plot}
              onClick={() => handleTileClick(index)}
            />
          ))}
        </div>

        {showAchievements && (
          <Achievements
            achievements={achievements}
            unlockedAchievements={unlockedAchievements}
            onClose={() => setShowAchievements(false)}
          />
        )}
      </div>
    </div>
  );
}

export default App;