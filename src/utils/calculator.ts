import { BrewMethod, RatioCalculation } from '../models/types';

/**
 * Standard coffee-to-water ratios for different brew methods
 */
const STANDARD_RATIOS: Record<BrewMethod, number> = {
  [BrewMethod.POUR_OVER]: 16, // 1:16
  [BrewMethod.FRENCH_PRESS]: 15, // 1:15
  [BrewMethod.ESPRESSO]: 2, // 1:2
  [BrewMethod.AEROPRESS]: 14, // 1:14
  [BrewMethod.COLD_BREW]: 8, // 1:8
};

/**
 * Calculate water amount based on coffee amount and brew method
 */
export function calculateWaterAmount(
  coffeeGrams: number,
  method: BrewMethod
): number {
  const ratio = STANDARD_RATIOS[method];
  return Math.round(coffeeGrams * ratio);
}

/**
 * Calculate coffee amount based on water amount and brew method
 */
export function calculateCoffeeAmount(
  waterMl: number,
  method: BrewMethod
): number {
  const ratio = STANDARD_RATIOS[method];
  return Math.round(waterMl / ratio);
}

/**
 * Get the standard ratio for a brew method
 */
export function getStandardRatio(method: BrewMethod): string {
  return `1:${STANDARD_RATIOS[method]}`;
}

/**
 * Calculate custom ratio
 */
export function calculateCustomRatio(
  coffeeGrams: number,
  waterMl: number,
  method: BrewMethod
): RatioCalculation {
  const ratio = waterMl / coffeeGrams;
  return {
    coffeeAmount: coffeeGrams,
    waterAmount: waterMl,
    ratio: `1:${ratio.toFixed(1)}`,
    method,
  };
}

/**
 * Validate if amounts are reasonable for the brew method
 */
export function validateBrewAmounts(
  coffeeGrams: number,
  waterMl: number,
  method: BrewMethod
): { valid: boolean; message?: string } {
  if (coffeeGrams <= 0 || waterMl <= 0) {
    return { valid: false, message: 'Amounts must be greater than 0' };
  }

  const ratio = waterMl / coffeeGrams;
  const standardRatio = STANDARD_RATIOS[method];
  
  // Allow 50% deviation from standard ratio
  const minRatio = standardRatio * 0.5;
  const maxRatio = standardRatio * 1.5;

  if (ratio < minRatio || ratio > maxRatio) {
    return {
      valid: false,
      message: `Ratio ${ratio.toFixed(1)} is unusual for ${method}. Standard is 1:${standardRatio}`,
    };
  }

  return { valid: true };
}

/**
 * Scale recipe amounts
 */
export function scaleRecipe(
  originalCoffee: number,
  originalWater: number,
  scaleFactor: number
): { coffee: number; water: number } {
  return {
    coffee: Math.round(originalCoffee * scaleFactor),
    water: Math.round(originalWater * scaleFactor),
  };
}
