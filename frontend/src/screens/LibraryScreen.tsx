/**
 * LibraryScreen - Main library interface with book grid
 * Source: docs/tech-spec-epic-1-frontend.md#LibraryScreen
 * Story: 1.1 Library Screen with Book Grid
 * AC: #1, #2, #3, #4, #8, #9, #10
 */

import React, { useState, useMemo } from 'react';
import { View, StyleSheet, FlatList, ScrollView, ActivityIndicator } from 'react-native';
import { Surface, Appbar, Chip, Text, Button } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import { useBooks } from '../hooks/useBooks';
import { BookCard } from '../components/BookCard';
import { ContinueReadingCard } from '../components/ContinueReadingCard';
import type { FilterType, Filter, Book } from '../types/book';

const FILTERS: Filter[] = [
  { value: 'all', label: 'All' },
  { value: 'free', label: 'Free' },
  { value: 'premium', label: 'Premium' },
  { value: 'beginner', label: 'Beginner' },
  { value: 'intermediate', label: 'Intermediate' },
  { value: 'advanced', label: 'Advanced' },
];

export const LibraryScreen: React.FC = () => {
  const navigation = useNavigation();
  const { books, currentBook, loading, error, refetch } = useBooks();
  const [activeFilter, setActiveFilter] = useState<FilterType>('all');

  // AC #4: Filter functionality
  const filteredBooks = useMemo(() => {
    return books.filter(book => {
      if (activeFilter === 'all') return true;
      if (activeFilter === 'free') return !book.isPremium;
      if (activeFilter === 'premium') return book.isPremium;
      // Level filters
      return book.level === activeFilter;
    });
  }, [books, activeFilter]);

  // AC #10: Performance - getItemLayout for 60 FPS
  const getItemLayout = (_data: Book[] | null | undefined, index: number) => ({
    length: 280, // Estimated card height
    offset: 280 * index,
    index,
  });

  // Error View
  if (error) {
    return (
      <Surface style={styles.container}>
        <Appbar.Header style={styles.header}>
          <Appbar.Content title="Your Library" />
          <Appbar.Action icon="cog" onPress={() => navigation.navigate('Settings')} />
        </Appbar.Header>
        <View style={styles.errorContainer}>
          <Text variant="headlineSmall" style={styles.errorTitle}>
            Unable to load books
          </Text>
          <Text variant="bodyMedium" style={styles.errorMessage}>
            Please check your connection and try again.
          </Text>
          <Button
            mode="contained"
            onPress={refetch}
            style={styles.retryButton}
            labelStyle={styles.retryButtonLabel}
          >
            Retry
          </Button>
        </View>
      </Surface>
    );
  }

  // Loading View
  if (loading) {
    return (
      <Surface style={styles.container}>
        <Appbar.Header style={styles.header}>
          <Appbar.Content title="Your Library" />
          <Appbar.Action icon="cog" onPress={() => navigation.navigate('Settings')} />
        </Appbar.Header>
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#EC4899" />
        </View>
      </Surface>
    );
  }

  return (
    <Surface style={styles.container}>
      <Appbar.Header style={styles.header}>
        <Appbar.Content title="Your Library" titleStyle={styles.headerTitle} />
        <Appbar.Action
          icon="cog"
          onPress={() => navigation.navigate('Settings')}
          accessibilityLabel="Settings"
        />
      </Appbar.Header>

      {/* AC #2, #3: Continue Reading Card (conditional) */}
      {currentBook && (
        <ContinueReadingCard
          book={currentBook}
          onPress={() => navigation.navigate('Reading', { bookId: currentBook.id })}
        />
      )}

      {/* AC #4: Filter Chips */}
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        style={styles.filterContainer}
        contentContainerStyle={styles.filterContent}
      >
        {FILTERS.map(filter => (
          <Chip
            key={filter.value}
            selected={activeFilter === filter.value}
            onPress={() => setActiveFilter(filter.value)}
            style={[
              styles.filterChip,
              activeFilter === filter.value && styles.filterChipActive,
            ]}
            textStyle={[
              styles.filterChipText,
              activeFilter === filter.value && styles.filterChipTextActive,
            ]}
            mode="flat"
          >
            {filter.label}
          </Chip>
        ))}
      </ScrollView>

      {/* AC #1, #5, #6, #7, #10: Book Grid with optimizations */}
      <FlatList
        data={filteredBooks}
        renderItem={({ item }) => <BookCard book={item} />}
        keyExtractor={(item) => item.id.toString()}
        numColumns={2}
        contentContainerStyle={styles.grid}
        columnWrapperStyle={styles.row}
        // AC #10: Performance optimizations
        initialNumToRender={10}
        maxToRenderPerBatch={10}
        windowSize={5}
        removeClippedSubviews={true}
        getItemLayout={getItemLayout}
        // AC #8: Empty state
        ListEmptyComponent={
          <View style={styles.emptyState}>
            <Text variant="headlineSmall" style={styles.emptyTitle}>
              No books found
            </Text>
            <Text variant="bodyMedium" style={styles.emptyMessage}>
              Check back soon!
            </Text>
          </View>
        }
      />
    </Surface>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF7ED', // Warm cream background
  },
  header: {
    backgroundColor: '#FFFFFF',
    elevation: 2,
  },
  headerTitle: {
    fontFamily: 'Poppins-Bold',
    fontSize: 24,
    color: '#292524',
  },
  filterContainer: {
    maxHeight: 56,
    marginVertical: 8,
  },
  filterContent: {
    paddingHorizontal: 16,
    gap: 8,
  },
  filterChip: {
    marginHorizontal: 4,
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#FED7AA',
    minHeight: 40, // Touch target
  },
  filterChipActive: {
    backgroundColor: '#EC4899',
    borderColor: '#EC4899',
  },
  filterChipText: {
    fontFamily: 'Inter-Regular',
    fontSize: 14,
    color: '#78716C',
  },
  filterChipTextActive: {
    color: '#FFFFFF',
    fontFamily: 'Inter-SemiBold',
  },
  grid: {
    paddingHorizontal: 14, // Accounts for card margin of 6px
    paddingBottom: 20,
  },
  row: {
    justifyContent: 'space-between',
  },
  emptyState: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 60,
    paddingHorizontal: 32,
  },
  emptyTitle: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 24,
    color: '#292524',
    marginBottom: 8,
    textAlign: 'center',
  },
  emptyMessage: {
    fontFamily: 'Inter-Regular',
    fontSize: 16,
    color: '#78716C',
    textAlign: 'center',
  },
  loadingContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  errorContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 32,
  },
  errorTitle: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 24,
    color: '#292524',
    marginBottom: 8,
    textAlign: 'center',
  },
  errorMessage: {
    fontFamily: 'Inter-Regular',
    fontSize: 16,
    color: '#78716C',
    textAlign: 'center',
    marginBottom: 24,
  },
  retryButton: {
    backgroundColor: '#EC4899',
    minHeight: 48, // Touch target
  },
  retryButtonLabel: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 16,
    color: '#FFFFFF',
  },
});
