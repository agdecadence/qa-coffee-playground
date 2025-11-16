import { Router, Request, Response } from 'express';
import { RecipeService } from '../services/recipeService';
import { BrewMethod, Difficulty } from '../models/types';

const router = Router();
const recipeService = new RecipeService();

/**
 * GET /api/recipes
 * Get all recipes
 */
router.get('/', (_req: Request, res: Response) => {
  const result = recipeService.getAllRecipes();
  res.json(result);
});

/**
 * GET /api/recipes/:id
 * Get recipe by ID
 */
router.get('/:id', (req: Request, res: Response) => {
  const result = recipeService.getRecipeById(req.params.id);
  res.status(result.success ? 200 : 404).json(result);
});

/**
 * GET /api/recipes/method/:method
 * Get recipes by brew method
 */
router.get('/method/:method', (req: Request, res: Response) => {
  const result = recipeService.getRecipesByMethod(req.params.method as BrewMethod);
  res.json(result);
});

/**
 * GET /api/recipes/difficulty/:difficulty
 * Get recipes by difficulty
 */
router.get('/difficulty/:difficulty', (req: Request, res: Response) => {
  const result = recipeService.getRecipesByDifficulty(req.params.difficulty as Difficulty);
  res.json(result);
});

/**
 * POST /api/recipes/:id/scale
 * Scale a recipe
 * Body: { scaleFactor: number }
 */
router.post('/:id/scale', (req: Request, res: Response) => {
  const { scaleFactor } = req.body;
  const result = recipeService.scaleRecipe(req.params.id, scaleFactor);
  res.status(result.success ? 200 : 400).json(result);
});

/**
 * GET /api/recipes/:id/timer
 * Get timer configuration for a recipe
 */
router.get('/:id/timer', (req: Request, res: Response) => {
  const result = recipeService.getTimerConfig(req.params.id);
  res.status(result.success ? 200 : 404).json(result);
});

/**
 * GET /api/recipes/search
 * Search recipes
 * Query param: q=<search term>
 */
router.get('/search/query', (req: Request, res: Response) => {
  const query = req.query.q as string;
  
  if (!query) {
    res.status(400).json({
      success: false,
      error: 'Query parameter "q" is required',
    });
    return;
  }

  const result = recipeService.searchRecipes(query);
  res.json(result);
});

export default router;
