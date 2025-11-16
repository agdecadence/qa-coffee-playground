import { BrewMethodInfo, BrewMethod, Difficulty } from '../models/types';

export const brewMethods: BrewMethodInfo[] = [
  {
    method: BrewMethod.POUR_OVER,
    name: 'Pour Over',
    description: 'A manual brewing method where hot water is poured over coffee grounds in a filter, allowing for precise control and a clean, bright cup.',
    difficulty: Difficulty.INTERMEDIATE,
    equipment: [
      'Pour over dripper (V60, Chemex, Kalita Wave)',
      'Paper or metal filter',
      'Gooseneck kettle',
      'Scale',
      'Grinder',
    ],
    typicalBrewTime: 210, // 3.5 minutes
    coffeeToWaterRatio: '1:16',
    pros: [
      'Clean, crisp cup',
      'Highlights subtle flavors',
      'Full control over variables',
      'Relatively affordable equipment',
      'Easy to clean',
    ],
    cons: [
      'Requires practice and technique',
      'Time-consuming',
      'Needs gooseneck kettle for best results',
      'One cup at a time',
    ],
  },
  {
    method: BrewMethod.FRENCH_PRESS,
    name: 'French Press',
    description: 'An immersion brewing method where coffee steeps in hot water before being separated by a metal mesh plunger. Produces a full-bodied, rich cup.',
    difficulty: Difficulty.BEGINNER,
    equipment: ['French press', 'Kettle', 'Scale', 'Grinder', 'Timer'],
    typicalBrewTime: 240, // 4 minutes
    coffeeToWaterRatio: '1:15',
    pros: [
      'Full-bodied, rich flavor',
      'Simple and forgiving',
      'Inexpensive',
      'Can brew multiple cups',
      'No paper filters needed',
    ],
    cons: [
      'Some sediment in cup',
      'Less clean than filtered methods',
      'Can over-extract if left too long',
      'Cleanup requires rinsing grounds',
    ],
  },
  {
    method: BrewMethod.ESPRESSO,
    name: 'Espresso',
    description: 'A concentrated coffee brewed by forcing hot water under high pressure through finely ground coffee. The base for many popular coffee drinks.',
    difficulty: Difficulty.ADVANCED,
    equipment: [
      'Espresso machine',
      'Grinder (preferably burr)',
      'Tamper',
      'Scale',
      'Distributor/WDT tool',
    ],
    typicalBrewTime: 28, // 25-30 seconds
    coffeeToWaterRatio: '1:2',
    pros: [
      'Rich, concentrated flavor',
      'Foundation for specialty drinks',
      'Quick preparation time',
      'Aromatic crema',
      'Impressive when mastered',
    ],
    cons: [
      'Expensive equipment',
      'Steep learning curve',
      'Requires fresh beans',
      'Maintenance intensive',
      'Precise technique needed',
    ],
  },
  {
    method: BrewMethod.AEROPRESS,
    name: 'AeroPress',
    description: 'A versatile manual brewing device using air pressure to push water through coffee grounds. Known for its portability and variety of brewing methods.',
    difficulty: Difficulty.BEGINNER,
    equipment: [
      'AeroPress',
      'Paper or metal filter',
      'Kettle',
      'Scale',
      'Grinder',
      'Stirrer',
    ],
    typicalBrewTime: 90, // 1.5 minutes
    coffeeToWaterRatio: '1:14',
    pros: [
      'Versatile brewing options',
      'Quick brew time',
      'Portable and durable',
      'Easy cleanup',
      'Affordable',
      'Smooth, low-acidity cup',
    ],
    cons: [
      'Single cup only',
      'Requires paper filters',
      'Technique varies widely',
      'Can be messy for beginners',
    ],
  },
  {
    method: BrewMethod.COLD_BREW,
    name: 'Cold Brew',
    description: 'Coffee grounds steeped in cold water for 12-24 hours, producing a smooth, sweet concentrate that can be diluted and served cold or hot.',
    difficulty: Difficulty.BEGINNER,
    equipment: [
      'Large jar or cold brew maker',
      'Filter or cheesecloth',
      'Scale',
      'Grinder',
    ],
    typicalBrewTime: 43200, // 12 hours (720 minutes)
    coffeeToWaterRatio: '1:8',
    pros: [
      'Smooth, low-acidity',
      'Makes concentrate for multiple servings',
      'Can be stored in fridge for up to 2 weeks',
      'Very forgiving method',
      'No heat or special equipment needed',
    ],
    cons: [
      'Long brew time (12-24 hours)',
      'Requires planning ahead',
      'Uses more coffee grounds',
      'Different flavor profile than hot coffee',
    ],
  },
];
