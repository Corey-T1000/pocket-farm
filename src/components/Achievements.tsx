import React from 'react';
import { Achievement } from '../types/game';

interface AchievementsProps {
  achievements: Achievement[];
  unlockedAchievements: Set<string>;
  onClose: () => void;
}

export function Achievements({ achievements, unlockedAchievements, onClose }: AchievementsProps) {
  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 max-w-md w-full max-h-[80vh] overflow-y-auto">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold">Achievements</h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700"
          >
            ✕
          </button>
        </div>
        
        <div className="space-y-4">
          {achievements.map(achievement => {
            const isUnlocked = unlockedAchievements.has(achievement.id);
            
            return (
              <div
                key={achievement.id}
                className={`p-4 rounded-lg ${
                  isUnlocked ? 'bg-green-100' : 'bg-gray-100'
                }`}
              >
                <div className="flex items-center gap-3">
                  <span className="text-2xl">{achievement.icon}</span>
                  <div>
                    <h3 className="font-semibold">{achievement.name}</h3>
                    <p className="text-sm text-gray-600">
                      {achievement.description}
                    </p>
                    {isUnlocked && (
                      <p className="text-sm text-green-600">
                        Reward: {achievement.reward} coins
                      </p>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}