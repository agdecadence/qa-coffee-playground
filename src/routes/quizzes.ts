import { Router, Request, Response } from 'express';
import { QuizService } from '../services/quizService';

const router = Router();
const quizService = new QuizService();

/**
 * GET /api/quizzes
 * Get all quizzes
 */
router.get('/', (_req: Request, res: Response) => {
  const result = quizService.getAllQuizzes();
  res.json(result);
});

/**
 * GET /api/quizzes/:id
 * Get quiz by ID
 */
router.get('/:id', (req: Request, res: Response) => {
  const result = quizService.getQuizById(req.params.id);
  res.status(result.success ? 200 : 404).json(result);
});

/**
 * GET /api/quizzes/lesson/:lessonId
 * Get quiz by lesson ID
 */
router.get('/lesson/:lessonId', (req: Request, res: Response) => {
  const result = quizService.getQuizByLessonId(req.params.lessonId);
  res.status(result.success ? 200 : 404).json(result);
});

/**
 * GET /api/quizzes/:id/questions
 * Get quiz questions without answers (for taking the quiz)
 */
router.get('/:id/questions', (req: Request, res: Response) => {
  const result = quizService.getQuizQuestions(req.params.id);
  res.status(result.success ? 200 : 404).json(result);
});

/**
 * POST /api/quizzes/submit
 * Submit quiz answers and get results
 * Body: { quizId: string, answers: number[] }
 */
router.post('/submit', (req: Request, res: Response) => {
  const result = quizService.submitQuiz(req.body);
  res.status(result.success ? 200 : 400).json(result);
});

export default router;
