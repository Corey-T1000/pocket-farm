export type CropType = 'carrot' | 'potato' | 'corn' | 'wheat' | 'golden_carrot' | 'blue_potato' | 'rainbow_corn';
export type WeatherType = 'sunny' | 'rainy' | 'drought' | 'perfect';
export type SeasonType = 'spring' | 'summer' | 'fall' | 'winter';
export type DecorationType = 'scarecrow' | 'fountain' | 'windmill' | 'flower_bed';

export interface CropData {
  name: string;
  growthTime: number;
  seedPrice: number;
  sellPrice: number;
  color: string;
  minLevel: number;
  weatherBonus: Record<WeatherType, number>;
  seasonalBonus: Record<SeasonType, number>;
  mutationChance?: {
    chance: number;
    result: CropType;
  };
}

export interface DecorationData {
  name: string;
  price: number;
  effect: {
    type: 'growth' | 'mutation' | 'weather';
    bonus: number;
  };
  icon: string;
}

export const DECORATIONS: Record<DecorationType, DecorationData> = {
  scarecrow: {
    name: 'Scarecrow',
    price: 500,
    effect: { type: 'growth', bonus: 1.1 },
    icon: '🎭'
  },
  fountain: {
    name: 'Magic Fountain',
    price: 1000,
    effect: { type: 'mutation', bonus: 1.2 },
    icon: '⛲'
  },
  windmill: {
    name: 'Ancient Windmill',
    price: 2000,
    effect: { type: 'weather', bonus: 1.15 },
    icon: '🏺'
  },
  flower_bed: {
    name: 'Mystical Flowers',
    price: 750,
    effect: { type: 'mutation', bonus: 1.1 },
    icon: '🌺'
  }
};

export const CROPS: Record<CropType, CropData> = {
  carrot: {
    name: 'Carrot',
    growthTime: 30,
    seedPrice: 10,
    sellPrice: 20,
    color: 'orange',
    minLevel: 1,
    weatherBonus: {
      sunny: 1,
      rainy: 1.2,
      drought: 0.8,
      perfect: 1.5
    },
    seasonalBonus: {
      spring: 1.2,
      summer: 1.0,
      fall: 1.1,
      winter: 0.8
    },
    mutationChance: {
      chance: 0.05,
      result: 'golden_carrot'
    }
  },
  potato: {
    name: 'Potato',
    growthTime: 45,
    seedPrice: 20,
    sellPrice: 45,
    color: 'yellow',
    minLevel: 2,
    weatherBonus: {
      sunny: 1.1,
      rainy: 1.3,
      drought: 0.7,
      perfect: 1.5
    },
    seasonalBonus: {
      spring: 1.1,
      summer: 1.2,
      fall: 1.0,
      winter: 0.9
    },
    mutationChance: {
      chance: 0.05,
      result: 'blue_potato'
    }
  },
  corn: {
    name: 'Corn',
    growthTime: 60,
    seedPrice: 30,
    sellPrice: 75,
    color: 'amber',
    minLevel: 3,
    weatherBonus: {
      sunny: 1.2,
      rainy: 1.1,
      drought: 0.6,
      perfect: 1.5
    },
    seasonalBonus: {
      spring: 1.0,
      summer: 1.3,
      fall: 1.2,
      winter: 0.7
    },
    mutationChance: {
      chance: 0.05,
      result: 'rainbow_corn'
    }
  },
  wheat: {
    name: 'Wheat',
    growthTime: 90,
    seedPrice: 50,
    sellPrice: 140,
    color: 'yellow',
    minLevel: 4,
    weatherBonus: {
      sunny: 1.3,
      rainy: 0.9,
      drought: 0.5,
      perfect: 1.5
    },
    seasonalBonus: {
      spring: 1.1,
      summer: 1.2,
      fall: 1.3,
      winter: 0.8
    }
  },
  golden_carrot: {
    name: '✨ Golden Carrot',
    growthTime: 45,
    seedPrice: 100,
    sellPrice: 300,
    color: 'amber',
    minLevel: 5,
    weatherBonus: {
      sunny: 1.3,
      rainy: 1.2,
      drought: 0.9,
      perfect: 2.0
    },
    seasonalBonus: {
      spring: 1.3,
      summer: 1.2,
      fall: 1.2,
      winter: 1.0
    }
  },
  blue_potato: {
    name: '💫 Blue Potato',
    growthTime: 60,
    seedPrice: 150,
    sellPrice: 400,
    color: 'blue',
    minLevel: 5,
    weatherBonus: {
      sunny: 1.2,
      rainy: 1.4,
      drought: 0.8,
      perfect: 2.0
    },
    seasonalBonus: {
      spring: 1.2,
      summer: 1.3,
      fall: 1.2,
      winter: 1.1
    }
  },
  rainbow_corn: {
    name: '🌈 Rainbow Corn',
    growthTime: 90,
    seedPrice: 200,
    sellPrice: 600,
    color: 'purple',
    minLevel: 5,
    weatherBonus: {
      sunny: 1.4,
      rainy: 1.3,
      drought: 0.7,
      perfect: 2.0
    },
    seasonalBonus: {
      spring: 1.2,
      summer: 1.4,
      fall: 1.3,
      winter: 0.9
    }
  }
};

export interface Achievement {
  id: string;
  name: string;
  description: string;
  icon: string;
  requirement: number;
  reward: number;
}

export const ACHIEVEMENTS: Achievement[] = [
  {
    id: 'first_harvest',
    name: 'First Harvest',
    description: 'Harvest your first crop',
    icon: '🌱',
    requirement: 1,
    reward: 50
  },
  {
    id: 'master_farmer',
    name: 'Master Farmer',
    description: 'Harvest 100 crops',
    icon: '🌾',
    requirement: 100,
    reward: 500
  },
  {
    id: 'weather_master',
    name: 'Weather Master',
    description: 'Get a perfect weather bonus',
    icon: '🌈',
    requirement: 1,
    reward: 200
  },
  {
    id: 'mutation_master',
    name: 'Mutation Master',
    description: 'Discover all rare crops',
    icon: '✨',
    requirement: 3,
    reward: 1000
  },
  {
    id: 'seasonal_expert',
    name: 'Seasonal Expert',
    description: 'Get max seasonal bonus in each season',
    icon: '🍂',
    requirement: 4,
    reward: 800
  },
  {
    id: 'decorator',
    name: 'Master Decorator',
    description: 'Place all types of decorations',
    icon: '🎨',
    requirement: 4,
    reward: 1500
  }
];

export interface Plot {
  state: 'empty' | 'seeded' | 'growing' | 'ready';
  cropType?: CropType;
  growthProgress: number;
  growthStart?: number;
  weatherBonus?: number;
  seasonalBonus?: number;
  decoration?: DecorationType;
}