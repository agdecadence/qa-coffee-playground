import { Lesson, ApiResponse } from '../models/types';
import { lessons } from '../data/lessons';

export class LessonService {
  /**
   * Get all lessons
   */
  getAllLessons(): ApiResponse<Lesson[]> {
    return {
      success: true,
      data: lessons.sort((a, b) => a.order - b.order),
    };
  }

  /**
   * Get lesson by ID
   */
  getLessonById(id: string): ApiResponse<Lesson> {
    const lesson = lessons.find((l) => l.id === id);
    
    if (!lesson) {
      return {
        success: false,
        error: `Lesson with ID ${id} not found`,
      };
    }

    return {
      success: true,
      data: lesson,
    };
  }

  /**
   * Get lessons by category
   */
  getLessonsByCategory(category: string): ApiResponse<Lesson[]> {
    const filtered = lessons.filter((l) => l.category === category);
    
    return {
      success: true,
      data: filtered.sort((a, b) => a.order - b.order),
    };
  }

  /**
   * Get lessons by difficulty
   */
  getLessonsByDifficulty(difficulty: string): ApiResponse<Lesson[]> {
    const filtered = lessons.filter((l) => l.difficulty === difficulty);
    
    return {
      success: true,
      data: filtered.sort((a, b) => a.order - b.order),
    };
  }

  /**
   * Get next lesson based on prerequisites
   */
  getNextLesson(completedLessonIds: string[]): ApiResponse<Lesson | null> {
    // Find first lesson where all prerequisites are completed
    const nextLesson = lessons
      .sort((a, b) => a.order - b.order)
      .find((lesson) => {
        // Skip if already completed
        if (completedLessonIds.includes(lesson.id)) {
          return false;
        }

        // If no prerequisites, it's available
        if (!lesson.prerequisites || lesson.prerequisites.length === 0) {
          return true;
        }

        // Check if all prerequisites are completed
        return lesson.prerequisites.every((prereqId) =>
          completedLessonIds.includes(prereqId)
        );
      });

    return {
      success: true,
      data: nextLesson || null,
      message: nextLesson ? undefined : 'All lessons completed!',
    };
  }
}
