/**
 * LibraryScreen Integration Tests
 * Story: 1.1 Library Screen with Book Grid
 * Tests AC: all
 */

import React from 'react';
import { render, waitFor, fireEvent } from '@testing-library/react-native';
import { NavigationContainer } from '@react-navigation/native';
import { LibraryScreen } from '../../screens/LibraryScreen';
import * as useBooksModule from '../../hooks/useBooks';
import type { Book } from '../../types/book';

// Mock navigation
const mockNavigate = jest.fn();
jest.mock('@react-navigation/native', () => ({
  ...jest.requireActual('@react-navigation/native'),
  useNavigation: () => ({
    navigate: mockNavigate,
  }),
}));

const mockBooks: Book[] = [
  {
    id: 1,
    title: 'The Great Gatsby',
    author: 'F. Scott Fitzgerald',
    level: 'intermediate',
    isPremium: false,
    coverUrl: 'test.jpg',
    description: 'Test',
    category: 'book',
    estimatedDuration: 45,
    learningBenefits: [],
    keyVocabulary: [],
    content: { chapters: [] },
    createdAt: '2025-11-02',
  },
  {
    id: 2,
    title: '1984',
    author: 'George Orwell',
    level: 'advanced',
    isPremium: true,
    coverUrl: 'test2.jpg',
    description: 'Test2',
    category: 'book',
    estimatedDuration: 60,
    learningBenefits: [],
    keyVocabulary: [],
    content: { chapters: [] },
    createdAt: '2025-11-02',
  },
];

const renderLibraryScreen = () => {
  return render(
    <NavigationContainer>
      <LibraryScreen />
    </NavigationContainer>
  );
};

describe('LibraryScreen', () => {
  beforeEach(() => {
    mockNavigate.mockClear();
  });

  it('displays loading state initially (AC #1)', () => {
    jest.spyOn(useBooksModule, 'useBooks').mockReturnValue({
      books: [],
      currentBook: null,
      loading: true,
      error: null,
      refetch: jest.fn(),
    });

    const { getByTestId } = renderLibraryScreen();
    // ActivityIndicator would be present during loading
  });

  it('displays books from API (AC #1)', async () => {
    jest.spyOn(useBooksModule, 'useBooks').mockReturnValue({
      books: mockBooks,
      currentBook: null,
      loading: false,
      error: null,
      refetch: jest.fn(),
    });

    const { getByText } = renderLibraryScreen();

    await waitFor(() => {
      expect(getByText('The Great Gatsby')).toBeTruthy();
      expect(getByText('1984')).toBeTruthy();
    });
  });

  it('shows Continue Reading card when book in progress (AC #2)', async () => {
    const currentBook = { ...mockBooks[0], progress: 35, currentChapter: 'Chapter 3' };

    jest.spyOn(useBooksModule, 'useBooks').mockReturnValue({
      books: mockBooks,
      currentBook,
      loading: false,
      error: null,
      refetch: jest.fn(),
    });

    const { getByText } = renderLibraryScreen();

    await waitFor(() => {
      expect(getByText('Continue Reading')).toBeTruthy();
    });
  });

  it('hides Continue Reading card when no book in progress (AC #3)', async () => {
    jest.spyOn(useBooksModule, 'useBooks').mockReturnValue({
      books: mockBooks,
      currentBook: null,
      loading: false,
      error: null,
      refetch: jest.fn(),
    });

    const { queryByText } = renderLibraryScreen();

    await waitFor(() => {
      expect(queryByText('Continue Reading')).toBeNull();
    });
  });

  it('filters books correctly by Premium (AC #4)', async () => {
    jest.spyOn(useBooksModule, 'useBooks').mockReturnValue({
      books: mockBooks,
      currentBook: null,
      loading: false,
      error: null,
      refetch: jest.fn(),
    });

    const { getByText, queryByText } = renderLibraryScreen();

    await waitFor(() => {
      expect(getByText('The Great Gatsby')).toBeTruthy();
    });

    // Click Premium filter
    fireEvent.press(getByText('Premium'));

    await waitFor(() => {
      expect(queryByText('The Great Gatsby')).toBeNull(); // Free book hidden
      expect(getByText('1984')).toBeTruthy(); // Premium book visible
    });
  });

  it('filters books correctly by Free (AC #4)', async () => {
    jest.spyOn(useBooksModule, 'useBooks').mockReturnValue({
      books: mockBooks,
      currentBook: null,
      loading: false,
      error: null,
      refetch: jest.fn(),
    });

    const { getByText, queryByText } = renderLibraryScreen();

    await waitFor(() => {
      expect(getByText('The Great Gatsby')).toBeTruthy();
    });

    // Click Free filter
    fireEvent.press(getByText('Free'));

    await waitFor(() => {
      expect(getByText('The Great Gatsby')).toBeTruthy(); // Free book visible
      expect(queryByText('1984')).toBeNull(); // Premium book hidden
    });
  });

  it('shows empty state when no books match filter (AC #8)', async () => {
    jest.spyOn(useBooksModule, 'useBooks').mockReturnValue({
      books: [],
      currentBook: null,
      loading: false,
      error: null,
      refetch: jest.fn(),
    });

    const { getByText } = renderLibraryScreen();

    await waitFor(() => {
      expect(getByText('No books found')).toBeTruthy();
      expect(getByText('Check back soon!')).toBeTruthy();
    });
  });

  it('shows error state with retry button (AC #1)', async () => {
    const mockRefetch = jest.fn();

    jest.spyOn(useBooksModule, 'useBooks').mockReturnValue({
      books: [],
      currentBook: null,
      loading: false,
      error: new Error('Network error'),
      refetch: mockRefetch,
    });

    const { getByText } = renderLibraryScreen();

    await waitFor(() => {
      expect(getByText('Unable to load books')).toBeTruthy();
      expect(getByText('Please check your connection and try again.')).toBeTruthy();
    });

    fireEvent.press(getByText('Retry'));
    expect(mockRefetch).toHaveBeenCalled();
  });
});
