import { Router, Request, Response } from 'express';
import { GlossaryService } from '../services/glossaryService';

const router = Router();
const glossaryService = new GlossaryService();

/**
 * GET /api/glossary
 * Get all glossary terms
 */
router.get('/', (_req: Request, res: Response) => {
  const result = glossaryService.getAllTerms();
  res.json(result);
});

/**
 * GET /api/glossary/:id
 * Get term by ID
 */
router.get('/:id', (req: Request, res: Response) => {
  const result = glossaryService.getTermById(req.params.id);
  res.status(result.success ? 200 : 404).json(result);
});

/**
 * GET /api/glossary/category/:category
 * Get terms by category
 */
router.get('/category/:category', (req: Request, res: Response) => {
  const result = glossaryService.getTermsByCategory(req.params.category);
  res.json(result);
});

/**
 * GET /api/glossary/:id/related
 * Get related terms
 */
router.get('/:id/related', (req: Request, res: Response) => {
  const result = glossaryService.getRelatedTerms(req.params.id);
  res.status(result.success ? 200 : 404).json(result);
});

/**
 * GET /api/glossary/search
 * Search terms
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

  const result = glossaryService.searchTerms(query);
  res.json(result);
});

export default router;
