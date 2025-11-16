import { Router, Request, Response } from 'express';
import { BrewMethodService } from '../services/brewMethodService';
import { BrewMethod } from '../models/types';

const router = Router();
const brewMethodService = new BrewMethodService();

/**
 * GET /api/brew-methods
 * Get all brew methods
 */
router.get('/', (_req: Request, res: Response) => {
  const result = brewMethodService.getAllBrewMethods();
  res.json(result);
});

/**
 * GET /api/brew-methods/:method
 * Get brew method by type
 */
router.get('/:method', (req: Request, res: Response) => {
  const result = brewMethodService.getBrewMethodByType(req.params.method as BrewMethod);
  res.status(result.success ? 200 : 404).json(result);
});

/**
 * GET /api/brew-methods/compare/:method1/:method2
 * Compare two brew methods
 */
router.get('/compare/:method1/:method2', (req: Request, res: Response) => {
  const result = brewMethodService.compareBrewMethods(
    req.params.method1 as BrewMethod,
    req.params.method2 as BrewMethod
  );
  res.status(result.success ? 200 : 404).json(result);
});

export default router;
