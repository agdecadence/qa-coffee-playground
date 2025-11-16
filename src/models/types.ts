// Core domain types

export enum BrewMethod {
  POUR_OVER = 'pour_over',
  FRENCH_PRESS = 'french_press',
  ESPRESSO = 'espresso',
  AEROPRESS = 'aeropress',
  COLD_BREW = 'cold_brew',
}

export enum RoastLevel {
  LIGHT = 'light',
  MEDIUM = 'medium',
  MEDIUM_DARK = 'medium_dark',
  DARK = 'dark',
}

export enum Difficulty {
  BEGINNER = 'beginner',
  INTERMEDIATE = 'intermediate',
  ADVANCED = 'advanced',
}

export interface Lesson {
  id: string;
  title: string;
  category: 'origins' | 'roasting' | 'brewing' | 'tasting' | 'terminology';
  difficulty: Difficulty;
  content: string;
  duration: number; // reading time in minutes
  prerequisites?: string[]; // lesson IDs
  order: number;
}

export interface QuizQuestion {
  id: string;
  lessonId: string;
  question: string;
  options: string[];
  correctAnswer: number; // index of correct option
  explanation: string;
}

export interface Quiz {
  id: string;
  lessonId: string;
  title: string;
  questions: QuizQuestion[];
  passingScore: number; // percentage
}

export interface Recipe {
  id: string;
  name: string;
  brewMethod: BrewMethod;
  difficulty: Difficulty;
  coffeeAmount: number; // in grams
  waterAmount: number; // in ml
  brewTime: number; // in seconds
  waterTemp: number; // in celsius
  grindSize: string;
  steps: BrewStep[];
  flavorProfile: string[];
  tips?: string[];
}

export interface BrewStep {
  order: number;
  duration: number; // in seconds
  instruction: string;
  timer?: boolean; // whether this step requires a timer
}

export interface BrewMethodInfo {
  method: BrewMethod;
  name: string;
  description: string;
  difficulty: Difficulty;
  equipment: string[];
  typicalBrewTime: number; // in seconds
  coffeeToWaterRatio: string;
  pros: string[];
  cons: string[];
  imageUrl?: string;
}

export interface GlossaryTerm {
  id: string;
  term: string;
  definition: string;
  category: 'brewing' | 'tasting' | 'equipment' | 'origin' | 'processing';
  relatedTerms?: string[];
}

export interface UserProgress {
  userId: string;
  completedLessons: string[];
  quizScores: Record<string, number>; // quizId -> score percentage
  favoriteRecipes: string[];
  brewingHistory: BrewRecord[];
}

export interface BrewRecord {
  id: string;
  recipeId: string;
  timestamp: Date;
  rating?: number; // 1-5
  notes?: string;
}

// API Response types
export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}

// Timer types
export interface TimerConfig {
  recipeId: string;
  steps: TimerStep[];
  totalDuration: number;
}

export interface TimerStep {
  stepNumber: number;
  duration: number;
  instruction: string;
  alert: boolean;
}

// Calculation types
export interface RatioCalculation {
  coffeeAmount: number;
  waterAmount: number;
  ratio: string; // e.g., "1:16"
  method: BrewMethod;
}
