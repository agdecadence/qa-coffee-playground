import { Quiz, QuizQuestion, ApiResponse } from '../models/types';
import { quizzes } from '../data/quizzes';

export interface QuizSubmission {
  quizId: string;
  answers: number[]; // Array of selected answer indices
}

export interface QuizResult {
  quizId: string;
  score: number;
  percentage: number;
  passed: boolean;
  correctAnswers: number;
  totalQuestions: number;
  feedback: QuestionFeedback[];
}

export interface QuestionFeedback {
  questionId: string;
  question: string;
  selectedAnswer: number;
  correctAnswer: number;
  isCorrect: boolean;
  explanation: string;
}

export class QuizService {
  /**
   * Get all quizzes
   */
  getAllQuizzes(): ApiResponse<Quiz[]> {
    return {
      success: true,
      data: quizzes,
    };
  }

  /**
   * Get quiz by ID
   */
  getQuizById(id: string): ApiResponse<Quiz> {
    const quiz = quizzes.find((q) => q.id === id);
    
    if (!quiz) {
      return {
        success: false,
        error: `Quiz with ID ${id} not found`,
      };
    }

    return {
      success: true,
      data: quiz,
    };
  }

  /**
   * Get quiz by lesson ID
   */
  getQuizByLessonId(lessonId: string): ApiResponse<Quiz> {
    const quiz = quizzes.find((q) => q.lessonId === lessonId);
    
    if (!quiz) {
      return {
        success: false,
        error: `No quiz found for lesson ${lessonId}`,
      };
    }

    return {
      success: true,
      data: quiz,
    };
  }

  /**
   * Submit quiz and get results
   */
  submitQuiz(submission: QuizSubmission): ApiResponse<QuizResult> {
    const quiz = quizzes.find((q) => q.id === submission.quizId);
    
    if (!quiz) {
      return {
        success: false,
        error: `Quiz with ID ${submission.quizId} not found`,
      };
    }

    if (submission.answers.length !== quiz.questions.length) {
      return {
        success: false,
        error: `Expected ${quiz.questions.length} answers, got ${submission.answers.length}`,
      };
    }

    // Calculate results
    let correctCount = 0;
    const feedback: QuestionFeedback[] = quiz.questions.map((question, index) => {
      const selectedAnswer = submission.answers[index];
      const isCorrect = selectedAnswer === question.correctAnswer;
      
      if (isCorrect) {
        correctCount++;
      }

      return {
        questionId: question.id,
        question: question.question,
        selectedAnswer,
        correctAnswer: question.correctAnswer,
        isCorrect,
        explanation: question.explanation,
      };
    });

    const percentage = Math.round((correctCount / quiz.questions.length) * 100);
    const passed = percentage >= quiz.passingScore;

    const result: QuizResult = {
      quizId: quiz.id,
      score: correctCount,
      percentage,
      passed,
      correctAnswers: correctCount,
      totalQuestions: quiz.questions.length,
      feedback,
    };

    return {
      success: true,
      data: result,
      message: passed 
        ? `Congratulations! You passed with ${percentage}%` 
        : `You scored ${percentage}%. Need ${quiz.passingScore}% to pass. Try again!`,
    };
  }

  /**
   * Get quiz questions without correct answers (for taking the quiz)
   */
  getQuizQuestions(quizId: string): ApiResponse<Omit<QuizQuestion, 'correctAnswer' | 'explanation'>[]> {
    const quiz = quizzes.find((q) => q.id === quizId);
    
    if (!quiz) {
      return {
        success: false,
        error: `Quiz with ID ${quizId} not found`,
      };
    }

    const questions = quiz.questions.map(({ correctAnswer, explanation, ...question }) => question);

    return {
      success: true,
      data: questions,
    };
  }
}
