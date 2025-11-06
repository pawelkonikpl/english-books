/**
 * BookCard Component Tests
 * Story: 1.1 Library Screen with Book Grid
 * Tests AC: #5, #6, #7, #9
 */

import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import { NavigationContainer } from '@react-navigation/native';
import { BookCard } from '../../components/BookCard';
import type { Book } from '../../types/book';

// Mock navigation
const mockNavigate = jest.fn();
jest.mock('@react-navigation/native', () => ({
  ...jest.requireActual('@react-navigation/native'),
  useNavigation: () => ({
    navigate: mockNavigate,
  }),
}));

const mockBook: Book = {
  id: 1,
  title: 'The Great Gatsby',
  author: 'F. Scott Fitzgerald',
  description: 'A classic novel',
  level: 'intermediate',
  category: 'book',
  coverUrl: 'https://example.com/cover.jpg',
  isPremium: false,
  estimatedDuration: 45,
  learningBenefits: ['Vocabulary'],
  keyVocabulary: ['vulnerable'],
  content: { chapters: [] },
  createdAt: '2025-11-02',
};

const renderBookCard = (book: Book) => {
  return render(
    <NavigationContainer>
      <BookCard book={book} />
    </NavigationContainer>
  );
};

describe('BookCard', () => {
  beforeEach(() => {
    mockNavigate.mockClear();
  });

  it('renders book title and author correctly', () => {
    const { getByText } = renderBookCard(mockBook);

    expect(getByText('The Great Gatsby')).toBeTruthy();
    expect(getByText('F. Scott Fitzgerald')).toBeTruthy();
  });

  it('shows premium badge for premium books (AC #5)', () => {
    const premiumBook = { ...mockBook, isPremium: true };
    const { getByText } = renderBookCard(premiumBook);

    expect(getByText('👑')).toBeTruthy();
  });

  it('does not show premium badge for free books (AC #5)', () => {
    const { queryByText } = renderBookCard(mockBook);

    expect(queryByText('👑')).toBeNull();
  });

  it('shows progress bar when book has progress > 0 (AC #6)', () => {
    const bookWithProgress = { ...mockBook, progress: 35 };
    const { getByTestId } = renderBookCard(bookWithProgress);

    expect(getByTestId('progress-bar')).toBeTruthy();
  });

  it('does not show progress bar when progress is 0 (AC #6)', () => {
    const bookNoProgress = { ...mockBook, progress: 0 };
    const { queryByTestId } = renderBookCard(bookNoProgress);

    expect(queryByTestId('progress-bar')).toBeNull();
  });

  it('navigates to BookDetail screen when pressed (AC #7)', () => {
    const { getByAccessibilityRole } = renderBookCard(mockBook);

    const card = getByAccessibilityRole('button');
    fireEvent.press(card);

    expect(mockNavigate).toHaveBeenCalledWith('BookDetail', { bookId: 1 });
  });

  it('calls custom onPress handler if provided (AC #7)', () => {
    const onPressMock = jest.fn();
    const { getByAccessibilityRole } = render(
      <NavigationContainer>
        <BookCard book={mockBook} onPress={onPressMock} />
      </NavigationContainer>
    );

    const card = getByAccessibilityRole('button');
    fireEvent.press(card);

    expect(onPressMock).toHaveBeenCalled();
    expect(mockNavigate).not.toHaveBeenCalled();
  });

  it('has proper accessibility label (AC #9)', () => {
    const { getByLabelText } = renderBookCard(mockBook);

    expect(
      getByLabelText(/The Great Gatsby by F. Scott Fitzgerald. intermediate level. Free book./)
    ).toBeTruthy();
  });

  it('includes progress in accessibility label when present (AC #9)', () => {
    const bookWithProgress = { ...mockBook, progress: 35 };
    const { getByLabelText } = renderBookCard(bookWithProgress);

    expect(getByLabelText(/Progress: 35%/)).toBeTruthy();
  });
});
