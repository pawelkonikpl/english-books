/**
 * ContinueReadingCard Component Tests
 * Story: 1.1 Library Screen with Book Grid
 * Tests AC: #2, #3
 */

import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import { ContinueReadingCard } from '../../components/ContinueReadingCard';
import type { Book } from '../../types/book';

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
  learningBenefits: [],
  keyVocabulary: [],
  content: { chapters: [] },
  createdAt: '2025-11-02',
  progress: 35,
  currentChapter: 'Chapter 3',
};

describe('ContinueReadingCard', () => {
  it('renders when book is provided (AC #2)', () => {
    const { getByText } = render(
      <ContinueReadingCard book={mockBook} onPress={jest.fn()} />
    );

    expect(getByText('Continue Reading')).toBeTruthy();
    expect(getByText('The Great Gatsby')).toBeTruthy();
    expect(getByText('Chapter 3 · 35%')).toBeTruthy();
  });

  it('does not render when book is null (AC #3)', () => {
    const { queryByText } = render(
      <ContinueReadingCard book={null as any} onPress={jest.fn()} />
    );

    expect(queryByText('Continue Reading')).toBeNull();
  });

  it('calls onPress when continue button is clicked (AC #2)', () => {
    const onPressMock = jest.fn();
    const { getByText } = render(
      <ContinueReadingCard book={mockBook} onPress={onPressMock} />
    );

    fireEvent.press(getByText('Continue Reading →'));

    expect(onPressMock).toHaveBeenCalled();
  });

  it('displays progress percentage (AC #2)', () => {
    const { getByText } = render(
      <ContinueReadingCard book={mockBook} onPress={jest.fn()} />
    );

    expect(getByText(/35%/)).toBeTruthy();
  });

  it('has proper accessibility label', () => {
    const { getByLabelText } = render(
      <ContinueReadingCard book={mockBook} onPress={jest.fn()} />
    );

    expect(getByLabelText('Continue reading The Great Gatsby')).toBeTruthy();
  });
});
