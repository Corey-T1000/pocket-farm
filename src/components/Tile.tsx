import React from 'react';
import { Sprout, GanttChart, Timer } from 'lucide-react';
import { Plot, CROPS } from '../types/game';

interface TileProps {
  plot: Plot;
  onClick: () => void;
  onHover?: () => void;
}

const CROP_COLORS = {
  orange: 'bg-orange-500',
  yellow: 'bg-yellow-500',
  amber: 'bg-amber-500',
  blue: 'bg-blue-500',
  purple: 'bg-purple-500'
} as const;

const CROP_TEXT_COLORS = {
  orange: 'text-orange-600',
  yellow: 'text-yellow-600',
  amber: 'text-amber-600',
  blue: 'text-blue-600',
  purple: 'text-purple-600'
} as const;

export function Tile({ plot, onClick, onHover }: TileProps) {
  const getCropColor = () => {
    if (!plot.cropType) return 'text-amber-800/30';
    const crop = CROPS[plot.cropType];
    return CROP_TEXT_COLORS[crop.color as keyof typeof CROP_TEXT_COLORS] || CROP_TEXT_COLORS.amber;
  };

  const getProgressBarColor = () => {
    if (!plot.cropType) return '';
    const crop = CROPS[plot.cropType];
    return CROP_COLORS[crop.color as keyof typeof CROP_COLORS] || CROP_COLORS.amber;
  };

  return (
    <button
      onClick={onClick}
      onMouseEnter={onHover}
      className="w-full h-full aspect-square bg-amber-100 rounded-lg p-2 relative group transition-all hover:bg-amber-200 active:scale-95"
    >
      <div className="absolute inset-0 flex items-center justify-center">
        {plot.state === 'empty' && (
          <div className="text-amber-800/30 group-hover:text-amber-800/50">
            <Sprout size={24} />
          </div>
        )}
        {(plot.state === 'seeded' || plot.state === 'growing') && (
          <div className={getCropColor()}>
            {plot.state === 'growing' ? <Timer size={24} /> : <Sprout size={24} />}
          </div>
        )}
        {plot.state === 'ready' && (
          <div className={`${getCropColor()} animate-bounce`}>
            <GanttChart size={24} />
          </div>
        )}
      </div>
      {plot.state === 'growing' && (
        <div className="absolute bottom-1 left-1 right-1 h-1 bg-gray-200 rounded-full overflow-hidden">
          <div
            className={`h-full ${getProgressBarColor()} transition-all duration-1000 rounded-full`}
            style={{ width: `${plot.growthProgress * 100}%` }}
          />
        </div>
      )}
    </button>
  );
}