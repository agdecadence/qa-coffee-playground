import { describe, it, expect } from 'vitest';
import {
  calculateWaterAmount,
  calculateCoffeeAmount,
  getStandardRatio,
  calculateCustomRatio,
  validateBrewAmounts,
  scaleRecipe,
} from '../src/utils/calculator';
import { BrewMethod } from '../src/models/types';

describe('Coffee Calculator', () => {
  describe('calculateWaterAmount', () => {
    it('should calculate correct water amount for pour over', () => {
      const water = calculateWaterAmount(20, BrewMethod.POUR_OVER);
      expect(water).toBe(320); // 20g * 16 = 320ml
    });

    it('should calculate correct water amount for espresso', () => {
      const water = calculateWaterAmount(18, BrewMethod.ESPRESSO);
      expect(water).toBe(36); // 18g * 2 = 36ml
    });

    it('should calculate correct water amount for french press', () => {
      const water = calculateWaterAmount(30, BrewMethod.FRENCH_PRESS);
      expect(water).toBe(450); // 30g * 15 = 450ml
    });
  });

  describe('calculateCoffeeAmount', () => {
    it('should calculate correct coffee amount for pour over', () => {
      const coffee = calculateCoffeeAmount(320, BrewMethod.POUR_OVER);
      expect(coffee).toBe(20); // 320ml / 16 = 20g
    });

    it('should calculate correct coffee amount for espresso', () => {
      const coffee = calculateCoffeeAmount(36, BrewMethod.ESPRESSO);
      expect(coffee).toBe(18); // 36ml / 2 = 18g
    });
  });

  describe('getStandardRatio', () => {
    it('should return correct ratio for pour over', () => {
      const ratio = getStandardRatio(BrewMethod.POUR_OVER);
      expect(ratio).toBe('1:16');
    });

    it('should return correct ratio for espresso', () => {
      const ratio = getStandardRatio(BrewMethod.ESPRESSO);
      expect(ratio).toBe('1:2');
    });
  });

  describe('calculateCustomRatio', () => {
    it('should calculate custom ratio correctly', () => {
      const result = calculateCustomRatio(20, 300, BrewMethod.POUR_OVER);
      expect(result.coffeeAmount).toBe(20);
      expect(result.waterAmount).toBe(300);
      expect(result.ratio).toBe('1:15.0');
      expect(result.method).toBe(BrewMethod.POUR_OVER);
    });
  });

  describe('validateBrewAmounts', () => {
    it('should validate correct pour over amounts', () => {
      const result = validateBrewAmounts(20, 320, BrewMethod.POUR_OVER);
      expect(result.valid).toBe(true);
    });

    it('should reject zero or negative amounts', () => {
      const result1 = validateBrewAmounts(0, 320, BrewMethod.POUR_OVER);
      expect(result1.valid).toBe(false);
      
      const result2 = validateBrewAmounts(20, -10, BrewMethod.POUR_OVER);
      expect(result2.valid).toBe(false);
    });

    it('should warn about unusual ratios', () => {
      const result = validateBrewAmounts(20, 1000, BrewMethod.POUR_OVER);
      expect(result.valid).toBe(false);
      expect(result.message).toContain('unusual');
    });
  });

  describe('scaleRecipe', () => {
    it('should scale recipe up correctly', () => {
      const result = scaleRecipe(20, 320, 2);
      expect(result.coffee).toBe(40);
      expect(result.water).toBe(640);
    });

    it('should scale recipe down correctly', () => {
      const result = scaleRecipe(20, 320, 0.5);
      expect(result.coffee).toBe(10);
      expect(result.water).toBe(160);
    });
  });
});
