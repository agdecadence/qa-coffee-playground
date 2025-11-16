import { BrewMethodInfo, BrewMethod, ApiResponse } from '../models/types';
import { brewMethods } from '../data/brewMethods';

export class BrewMethodService {
  /**
   * Get all brew methods
   */
  getAllBrewMethods(): ApiResponse<BrewMethodInfo[]> {
    return {
      success: true,
      data: brewMethods,
    };
  }

  /**
   * Get brew method by type
   */
  getBrewMethodByType(method: BrewMethod): ApiResponse<BrewMethodInfo> {
    const brewMethod = brewMethods.find((bm) => bm.method === method);
    
    if (!brewMethod) {
      return {
        success: false,
        error: `Brew method ${method} not found`,
      };
    }

    return {
      success: true,
      data: brewMethod,
    };
  }

  /**
   * Compare two brew methods
   */
  compareBrewMethods(method1: BrewMethod, method2: BrewMethod): ApiResponse<{
    method1: BrewMethodInfo;
    method2: BrewMethodInfo;
    comparison: {
      easierMethod: string;
      fasterMethod: string;
      equipmentDifference: number;
    };
  }> {
    const bm1 = brewMethods.find((bm) => bm.method === method1);
    const bm2 = brewMethods.find((bm) => bm.method === method2);
    
    if (!bm1 || !bm2) {
      return {
        success: false,
        error: 'One or both brew methods not found',
      };
    }

    const difficultyOrder = { beginner: 1, intermediate: 2, advanced: 3 };
    const easierMethod = 
      difficultyOrder[bm1.difficulty] <= difficultyOrder[bm2.difficulty] 
        ? bm1.name 
        : bm2.name;
    
    const fasterMethod = 
      bm1.typicalBrewTime <= bm2.typicalBrewTime 
        ? bm1.name 
        : bm2.name;

    return {
      success: true,
      data: {
        method1: bm1,
        method2: bm2,
        comparison: {
          easierMethod,
          fasterMethod,
          equipmentDifference: Math.abs(bm1.equipment.length - bm2.equipment.length),
        },
      },
    };
  }
}
