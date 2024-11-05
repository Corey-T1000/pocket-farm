# Codebase Summary

## Key Components

### App.tsx
- Main game container
- Manages global game state
- Coordinates component interactions

### Components
- Tile: Individual plot component
- Inventory: Player inventory and shop
- Weather: Weather system display
- Achievements: Achievement tracking

### Custom Hooks
- useWeather: Weather system management
- useAchievements: Achievement tracking
- useSaveState: Save/load functionality

## Data Flow
1. User interactions trigger state updates
2. State changes propagate to relevant components
3. Effects handle side effects (growth, weather changes)
4. Save system persists state changes

## External Dependencies
- lucide-react: Icon system
- Tailwind CSS: Styling framework

## Recent Changes
- Implemented save/load system
- Added achievement system
- Integrated weather effects
- Enhanced UI/UX with animations

## Code Organization
```
src/
├── components/     # UI components
├── hooks/         # Custom React hooks
├── types/         # TypeScript types
└── App.tsx        # Main application
```

## Development Guidelines
1. Follow TypeScript best practices
2. Use meaningful component names
3. Implement proper error handling
4. Maintain consistent code style
5. Write clear documentation