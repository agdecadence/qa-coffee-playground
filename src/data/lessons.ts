import { Lesson, Difficulty } from '../models/types';

export const lessons: Lesson[] = [
  {
    id: 'lesson-001',
    title: 'Introduction to Coffee',
    category: 'origins',
    difficulty: Difficulty.BEGINNER,
    content: `Coffee is one of the most popular beverages in the world, enjoyed by millions daily. But have you ever wondered where it comes from?

The coffee plant, genus Coffea, produces berries called coffee cherries. Inside these cherries are the seeds we know as coffee beans. There are two main species of coffee: Arabica and Robusta.

**Arabica (Coffea arabica)**
- Accounts for about 60-70% of global production
- Grown at higher altitudes (600-2000m)
- Sweeter, more complex flavor
- Lower caffeine content (1.2-1.5%)
- More expensive and delicate

**Robusta (Coffea canephora)**
- Accounts for about 30-40% of global production
- Grown at lower altitudes (0-800m)
- Stronger, more bitter taste
- Higher caffeine content (2.2-2.7%)
- More disease-resistant and easier to cultivate

Coffee is grown in the "Coffee Belt" - the region between the Tropics of Cancer and Capricorn, where conditions are ideal for coffee cultivation.`,
    duration: 5,
    order: 1,
  },
  {
    id: 'lesson-002',
    title: 'Coffee Growing Regions',
    category: 'origins',
    difficulty: Difficulty.BEGINNER,
    content: `Coffee is grown in over 70 countries, each producing beans with unique characteristics influenced by climate, altitude, and soil.

**Major Coffee Regions:**

**Latin America**
- Brazil: Largest producer, nutty and chocolatey flavors
- Colombia: Well-balanced, medium body, bright acidity
- Guatemala: Full body, spicy notes, chocolate undertones

**Africa**
- Ethiopia: Birthplace of coffee, fruity and floral notes
- Kenya: Bright acidity, wine-like characteristics, berry notes
- Tanzania: Medium body, sweet and bright

**Asia & Pacific**
- Indonesia: Full body, earthy, low acidity
- Vietnam: Second-largest producer, mostly Robusta
- Papua New Guinea: Sweet, fruity, wine-like acidity

The terroir (environment) where coffee is grown significantly impacts its flavor profile, much like wine grapes.`,
    duration: 6,
    prerequisites: ['lesson-001'],
    order: 2,
  },
  {
    id: 'lesson-003',
    title: 'Understanding Roast Levels',
    category: 'roasting',
    difficulty: Difficulty.BEGINNER,
    content: `The roasting process transforms green coffee beans into the aromatic brown beans we brew. The roast level dramatically affects flavor, acidity, and body.

**Light Roast**
- Light brown color
- No oil on surface
- Highest acidity
- Most caffeine retained
- Pronounced origin characteristics
- Flavors: Floral, fruity, bright
- Also called: Cinnamon, Light City

**Medium Roast**
- Medium brown color
- Balanced flavor and acidity
- No oil on surface
- Good body
- Flavors: Balanced, sweet, caramel
- Also called: City, American, Breakfast

**Medium-Dark Roast**
- Dark brown with slight oil
- Bittersweet aftertaste
- Lower acidity
- Fuller body
- Flavors: Chocolate, nutty, spicy
- Also called: Full City, After Dinner

**Dark Roast**
- Very dark brown to black
- Shiny oil surface
- Lowest acidity
- Bitter notes dominant
- Origin flavors masked
- Flavors: Smoky, burnt, bold
- Also called: French, Italian, Espresso

Remember: Darker doesn't mean stronger! It means more roasted flavor and less origin character.`,
    duration: 7,
    prerequisites: ['lesson-001'],
    order: 3,
  },
  {
    id: 'lesson-004',
    title: 'Pour Over Brewing Basics',
    category: 'brewing',
    difficulty: Difficulty.INTERMEDIATE,
    content: `Pour over is a manual brewing method that gives you precise control over extraction. It's beloved by coffee enthusiasts for its clean, nuanced cups.

**Why Pour Over?**
- Complete control over brewing variables
- Highlights subtle flavor notes
- Clean, crisp cup
- Relatively quick (3-4 minutes)

**Essential Equipment:**
- Pour over dripper (V60, Chemex, Kalita Wave)
- Paper or metal filter
- Gooseneck kettle (for control)
- Scale (for precision)
- Timer

**Key Variables:**
- Coffee-to-water ratio: 1:15 to 1:17 (typically 1:16)
- Grind size: Medium (like sea salt)
- Water temperature: 195-205°F (90-96°C)
- Total brew time: 3-4 minutes

**Basic Technique:**
1. **Bloom**: Pour 2x coffee weight in water, wait 30-45 seconds
2. **Main pour**: Add water in circular motions
3. **Maintain level**: Keep water level consistent
4. **Total time**: Finish brewing by 3:30-4:00

The bloom phase allows CO2 to escape, ensuring even extraction. The spiral pour motion ensures all grounds are saturated evenly.`,
    duration: 8,
    prerequisites: ['lesson-003'],
    order: 4,
  },
  {
    id: 'lesson-005',
    title: 'Espresso Fundamentals',
    category: 'brewing',
    difficulty: Difficulty.ADVANCED,
    content: `Espresso is the foundation of many coffee drinks and requires precision, pressure, and practice to master.

**What is Espresso?**
Espresso is a concentrated coffee beverage brewed by forcing hot water under high pressure (9 bars) through finely ground coffee in 25-30 seconds.

**The Perfect Shot:**
- Dose: 18-20g of coffee
- Yield: 36-40g of liquid (1:2 ratio)
- Time: 25-30 seconds
- Temperature: 195-205°F (90-96°C)
- Pressure: 9 bars

**Components of a Shot:**
1. **Crema**: Golden-brown foam on top, indicates freshness
2. **Body**: Rich, syrupy consistency
3. **Heart**: Darker liquid beneath crema

**Dialing In:**
Adjusting variables to achieve proper extraction:
- **Too Fast (<25s)**: Under-extracted, sour, thin
  - Solution: Grind finer or increase dose
- **Too Slow (>30s)**: Over-extracted, bitter, harsh
  - Solution: Grind coarser or decrease dose

**Common Issues:**
- Channeling: Water finds paths of least resistance
- Uneven extraction: Poor distribution or tamping
- Sour taste: Under-extraction, low temperature
- Bitter taste: Over-extraction, high temperature

Mastering espresso takes practice, but understanding these fundamentals will accelerate your learning.`,
    duration: 10,
    prerequisites: ['lesson-003', 'lesson-004'],
    order: 5,
  },
];
