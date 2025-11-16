import { Router, Request, Response } from 'express';
import { BrewMethod } from '../models/types';
import {
  calculateWaterAmount,
  calculateCoffeeAmount,
  getStandardRatio,
  calculateCustomRatio,
  validateBrewAmounts,
  scaleRecipe,
} from '../utils/calculator';

const router = Router();

/**
 * POST /api/calculator/water
 * Calculate water amount from coffee amount
 * Body: { coffeeGrams: number, method: BrewMethod }
 */
router.post('/water', (req: Request, res: Response) => {
  const { coffeeGrams, method } = req.body;

  if (!coffeeGrams || !method) {
    res.status(400).json({
      success: false,
      error: 'coffeeGrams and method are required',
    });
    return;
  }

  const waterAmount = calculateWaterAmount(coffeeGrams, method as BrewMethod);

  res.json({
    success: true,
    data: {
      coffeeGrams,
      waterMl: waterAmount,
      method,
      ratio: getStandardRatio(method as BrewMethod),
    },
  });
});

/**
 * POST /api/calculator/coffee
 * Calculate coffee amount from water amount
 * Body: { waterMl: number, method: BrewMethod }
 */
router.post('/coffee', (req: Request, res: Response) => {
  const { waterMl, method } = req.body;

  if (!waterMl || !method) {
    res.status(400).json({
      success: false,
      error: 'waterMl and method are required',
    });
    return;
  }

  const coffeeAmount = calculateCoffeeAmount(waterMl, method as BrewMethod);

  res.json({
    success: true,
    data: {
      coffeeGrams: coffeeAmount,
      waterMl,
      method,
      ratio: getStandardRatio(method as BrewMethod),
    },
  });
});

/**
 * POST /api/calculator/custom-ratio
 * Calculate custom ratio
 * Body: { coffeeGrams: number, waterMl: number, method: BrewMethod }
 */
router.post('/custom-ratio', (req: Request, res: Response) => {
  const { coffeeGrams, waterMl, method } = req.body;

  if (!coffeeGrams || !waterMl || !method) {
    res.status(400).json({
      success: false,
      error: 'coffeeGrams, waterMl, and method are required',
    });
    return;
  }

  const ratio = calculateCustomRatio(coffeeGrams, waterMl, method as BrewMethod);

  res.json({
    success: true,
    data: ratio,
  });
});

/**
 * POST /api/calculator/validate
 * Validate brew amounts
 * Body: { coffeeGrams: number, waterMl: number, method: BrewMethod }
 */
router.post('/validate', (req: Request, res: Response) => {
  const { coffeeGrams, waterMl, method } = req.body;

  if (!coffeeGrams || !waterMl || !method) {
    res.status(400).json({
      success: false,
      error: 'coffeeGrams, waterMl, and method are required',
    });
    return;
  }

  const validation = validateBrewAmounts(coffeeGrams, waterMl, method as BrewMethod);

  res.json({
    success: validation.valid,
    data: validation,
    message: validation.message,
  });
});

/**
 * POST /api/calculator/scale
 * Scale recipe amounts
 * Body: { coffeeGrams: number, waterMl: number, scaleFactor: number }
 */
router.post('/scale', (req: Request, res: Response) => {
  const { coffeeGrams, waterMl, scaleFactor } = req.body;

  if (!coffeeGrams || !waterMl || !scaleFactor) {
    res.status(400).json({
      success: false,
      error: 'coffeeGrams, waterMl, and scaleFactor are required',
    });
    return;
  }

  if (scaleFactor <= 0) {
    res.status(400).json({
      success: false,
      error: 'scaleFactor must be greater than 0',
    });
    return;
  }

  const scaled = scaleRecipe(coffeeGrams, waterMl, scaleFactor);

  res.json({
    success: true,
    data: {
      original: { coffee: coffeeGrams, water: waterMl },
      scaled,
      scaleFactor,
    },
  });
});

/**
 * GET /api/calculator/ratio/:method
 * Get standard ratio for a brew method
 */
router.get('/ratio/:method', (req: Request, res: Response) => {
  const method = req.params.method as BrewMethod;
  
  try {
    const ratio = getStandardRatio(method);
    res.json({
      success: true,
      data: {
        method,
        ratio,
      },
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      error: 'Invalid brew method',
    });
  }
});

export default router;
