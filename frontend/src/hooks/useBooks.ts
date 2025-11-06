/**
 * useBooks Hook - Fetch and manage book list with progress
 * Source: docs/tech-spec-epic-1-frontend.md#useBooks
 * Story: 1.1 Library Screen with Book Grid
 */

import { useState, useEffect } from 'react';
import axios from 'axios';
import { Book, APIResponse } from '../types/book';

const API_BASE_URL = 'http://localhost:8000/api/v1';
const CURRENT_USER_ID = 1; // Hardcoded for MVP

interface UseBooksReturn {
  books: Book[];
  currentBook: Book | null;
  loading: boolean;
  error: Error | null;
  refetch: () => Promise<void>;
}

export function useBooks(): UseBooksReturn {
  const [books, setBooks] = useState<Book[]>([]);
  const [currentBook, setCurrentBook] = useState<Book | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  const fetchBooks = async () => {
    try {
      setLoading(true);
      setError(null);

      // Fetch all books
      const booksResponse = await axios.get<APIResponse<Book[]>>(
        `${API_BASE_URL}/lessons`
      );

      if (!booksResponse.data.success) {
        throw new Error('Failed to fetch books');
      }

      const booksData = booksResponse.data.data;

      // Fetch current reading progress
      let currentBookId: number | null = null;
      let progressPercentage = 0;

      try {
        const progressResponse = await axios.get(
          `${API_BASE_URL}/progress/current?user_id=${CURRENT_USER_ID}`
        );

        if (progressResponse.data.success && progressResponse.data.data) {
          currentBookId = progressResponse.data.data.lessonId;
          progressPercentage = progressResponse.data.data.progressPercentage;
        }
      } catch (progressError) {
        // No current book in progress - not an error
        console.log('No book in progress');
      }

      // Merge progress data with books
      const booksWithProgress = booksData.map(book => ({
        ...book,
        progress: book.id === currentBookId ? progressPercentage : 0,
      }));

      setBooks(booksWithProgress);

      // Set current book if exists
      const current = booksWithProgress.find(b => b.id === currentBookId) || null;
      setCurrentBook(current);

    } catch (err) {
      setError(err as Error);
      console.error('Error fetching books:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBooks();
  }, []);

  return {
    books,
    currentBook,
    loading,
    error,
    refetch: fetchBooks,
  };
}
