import express, { Application, Request, Response } from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import path from 'path';

// Import routes
import lessonsRouter from './routes/lessons';
import quizzesRouter from './routes/quizzes';
import recipesRouter from './routes/recipes';
import brewMethodsRouter from './routes/brewMethods';
import glossaryRouter from './routes/glossary';
import calculatorRouter from './routes/calculator';

// Load environment variables
dotenv.config();

const app: Application = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve static files from public directory
app.use(express.static(path.join(__dirname, '../public')));

// API Routes
app.use('/api/lessons', lessonsRouter);
app.use('/api/quizzes', quizzesRouter);
app.use('/api/recipes', recipesRouter);
app.use('/api/brew-methods', brewMethodsRouter);
app.use('/api/glossary', glossaryRouter);
app.use('/api/calculator', calculatorRouter);

// Health check endpoint
app.get('/api/health', (_req: Request, res: Response) => {
  res.json({
    success: true,
    message: 'Coffee Education Platform API is running',
    timestamp: new Date().toISOString(),
  });
});

// API documentation endpoint
app.get('/api', (_req: Request, res: Response) => {
  res.json({
    success: true,
    message: 'Coffee Education Platform API',
    version: '1.0.0',
    endpoints: {
      lessons: {
        'GET /api/lessons': 'Get all lessons',
        'GET /api/lessons/:id': 'Get lesson by ID',
        'GET /api/lessons/category/:category': 'Get lessons by category',
        'GET /api/lessons/difficulty/:difficulty': 'Get lessons by difficulty',
        'POST /api/lessons/next': 'Get next available lesson',
      },
      quizzes: {
        'GET /api/quizzes': 'Get all quizzes',
        'GET /api/quizzes/:id': 'Get quiz by ID',
        'GET /api/quizzes/lesson/:lessonId': 'Get quiz by lesson ID',
        'GET /api/quizzes/:id/questions': 'Get quiz questions',
        'POST /api/quizzes/submit': 'Submit quiz answers',
      },
      recipes: {
        'GET /api/recipes': 'Get all recipes',
        'GET /api/recipes/:id': 'Get recipe by ID',
        'GET /api/recipes/method/:method': 'Get recipes by brew method',
        'GET /api/recipes/difficulty/:difficulty': 'Get recipes by difficulty',
        'POST /api/recipes/:id/scale': 'Scale a recipe',
        'GET /api/recipes/:id/timer': 'Get timer config for recipe',
        'GET /api/recipes/search/query?q=<term>': 'Search recipes',
      },
      brewMethods: {
        'GET /api/brew-methods': 'Get all brew methods',
        'GET /api/brew-methods/:method': 'Get brew method details',
        'GET /api/brew-methods/compare/:method1/:method2': 'Compare brew methods',
      },
      glossary: {
        'GET /api/glossary': 'Get all terms',
        'GET /api/glossary/:id': 'Get term by ID',
        'GET /api/glossary/category/:category': 'Get terms by category',
        'GET /api/glossary/:id/related': 'Get related terms',
        'GET /api/glossary/search/query?q=<term>': 'Search terms',
      },
      calculator: {
        'POST /api/calculator/water': 'Calculate water amount',
        'POST /api/calculator/coffee': 'Calculate coffee amount',
        'POST /api/calculator/custom-ratio': 'Calculate custom ratio',
        'POST /api/calculator/validate': 'Validate brew amounts',
        'POST /api/calculator/scale': 'Scale recipe',
        'GET /api/calculator/ratio/:method': 'Get standard ratio',
      },
    },
  });
});

// Serve frontend for all other routes
app.get('*', (_req: Request, res: Response) => {
  res.sendFile(path.join(__dirname, '../public/index.html'));
});

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Coffee Education Platform API running on port ${PORT}`);
  console.log(`📚 API Documentation: http://localhost:${PORT}/api`);
  console.log(`🌐 Web App: http://localhost:${PORT}`);
});

export default app;
