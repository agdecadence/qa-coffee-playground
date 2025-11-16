import { Router, Request, Response } from 'express';
import { LessonService } from '../services/lessonService';

const router = Router();
const lessonService = new LessonService();

/**
 * GET /api/lessons
 * Get all lessons
 */
router.get('/', (_req: Request, res: Response) => {
  const result = lessonService.getAllLessons();
  res.json(result);
});

/**
 * GET /api/lessons/:id
 * Get lesson by ID
 */
router.get('/:id', (req: Request, res: Response) => {
  const result = lessonService.getLessonById(req.params.id);
  res.status(result.success ? 200 : 404).json(result);
});

/**
 * GET /api/lessons/category/:category
 * Get lessons by category
 */
router.get('/category/:category', (req: Request, res: Response) => {
  const result = lessonService.getLessonsByCategory(req.params.category);
  res.json(result);
});

/**
 * GET /api/lessons/difficulty/:difficulty
 * Get lessons by difficulty
 */
router.get('/difficulty/:difficulty', (req: Request, res: Response) => {
  const result = lessonService.getLessonsByDifficulty(req.params.difficulty);
  res.json(result);
});

/**
 * POST /api/lessons/next
 * Get next available lesson based on completed lessons
 * Body: { completedLessonIds: string[] }
 */
router.post('/next', (req: Request, res: Response) => {
  const { completedLessonIds = [] } = req.body;
  const result = lessonService.getNextLesson(completedLessonIds);
  res.json(result);
});

export default router;
