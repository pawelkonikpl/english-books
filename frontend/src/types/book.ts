/**
 * Book and related types for English Learning App
 * Source: docs/tech-spec-epic-1-frontend.md#TypeScript-Types
 */

export interface Book {
  id: number;
  title: string;
  author: string;
  description: string;
  level: 'beginner' | 'intermediate' | 'advanced';
  category: string;
  coverUrl: string;
  isPremium: boolean;
  estimatedDuration: number; // minutes
  learningBenefits: string[];
  keyVocabulary: string[];
  content: BookContent;
  createdAt: string;

  // Progress data (merged from user_progress)
  progress?: number; // 0-100
  currentChapter?: string;
  lastAccessed?: string;
}

export interface BookContent {
  chapters: Chapter[];
}

export interface Chapter {
  id: number;
  title: string;
  content: string;
  audioUrl: string;
}

export type FilterType = 'all' | 'free' | 'premium' | 'beginner' | 'intermediate' | 'advanced';

export interface Filter {
  value: FilterType;
  label: string;
}

// API Response types
export interface APIResponse<T> {
  success: boolean;
  data: T;
  message?: string;
}

export interface APIError {
  success: false;
  error: {
    code: string;
    message: string;
  };
}
