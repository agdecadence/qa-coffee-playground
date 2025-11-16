import { Recipe, BrewMethod, Difficulty, ApiResponse, TimerConfig, TimerStep } from '../models/types';
import { recipes } from '../data/recipes';
import { scaleRecipe } from '../utils/calculator';

export class RecipeService {
  /**
   * Get all recipes
   */
  getAllRecipes(): ApiResponse<Recipe[]> {
    return {
      success: true,
      data: recipes,
    };
  }

  /**
   * Get recipe by ID
   */
  getRecipeById(id: string): ApiResponse<Recipe> {
    const recipe = recipes.find((r) => r.id === id);
    
    if (!recipe) {
      return {
        success: false,
        error: `Recipe with ID ${id} not found`,
      };
    }

    return {
      success: true,
      data: recipe,
    };
  }

  /**
   * Get recipes by brew method
   */
  getRecipesByMethod(method: BrewMethod): ApiResponse<Recipe[]> {
    const filtered = recipes.filter((r) => r.brewMethod === method);
    
    return {
      success: true,
      data: filtered,
    };
  }

  /**
   * Get recipes by difficulty
   */
  getRecipesByDifficulty(difficulty: Difficulty): ApiResponse<Recipe[]> {
    const filtered = recipes.filter((r) => r.difficulty === difficulty);
    
    return {
      success: true,
      data: filtered,
    };
  }

  /**
   * Scale a recipe
   */
  scaleRecipe(recipeId: string, scaleFactor: number): ApiResponse<Recipe> {
    const recipe = recipes.find((r) => r.id === recipeId);
    
    if (!recipe) {
      return {
        success: false,
        error: `Recipe with ID ${recipeId} not found`,
      };
    }

    if (scaleFactor <= 0) {
      return {
        success: false,
        error: 'Scale factor must be greater than 0',
      };
    }

    const scaled = scaleRecipe(recipe.coffeeAmount, recipe.waterAmount, scaleFactor);

    const scaledRecipe: Recipe = {
      ...recipe,
      coffeeAmount: scaled.coffee,
      waterAmount: scaled.water,
    };

    return {
      success: true,
      data: scaledRecipe,
      message: `Recipe scaled by ${scaleFactor}x`,
    };
  }

  /**
   * Get timer configuration for a recipe
   */
  getTimerConfig(recipeId: string): ApiResponse<TimerConfig> {
    const recipe = recipes.find((r) => r.id === recipeId);
    
    if (!recipe) {
      return {
        success: false,
        error: `Recipe with ID ${recipeId} not found`,
      };
    }

    const timerSteps: TimerStep[] = recipe.steps
      .filter((step) => step.timer)
      .map((step) => ({
        stepNumber: step.order,
        duration: step.duration,
        instruction: step.instruction,
        alert: true,
      }));

    const totalDuration = timerSteps.reduce((sum, step) => sum + step.duration, 0);

    const config: TimerConfig = {
      recipeId: recipe.id,
      steps: timerSteps,
      totalDuration,
    };

    return {
      success: true,
      data: config,
    };
  }

  /**
   * Search recipes by name or flavor profile
   */
  searchRecipes(query: string): ApiResponse<Recipe[]> {
    const lowerQuery = query.toLowerCase();
    
    const filtered = recipes.filter((recipe) => {
      const nameMatch = recipe.name.toLowerCase().includes(lowerQuery);
      const flavorMatch = recipe.flavorProfile.some((flavor) =>
        flavor.toLowerCase().includes(lowerQuery)
      );
      const methodMatch = recipe.brewMethod.toLowerCase().includes(lowerQuery);
      
      return nameMatch || flavorMatch || methodMatch;
    });

    return {
      success: true,
      data: filtered,
      message: `Found ${filtered.length} recipe(s)`,
    };
  }
}
