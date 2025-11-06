/**
 * BookCard Component - Individual book card in grid
 * Source: docs/tech-spec-epic-1-frontend.md#BookCard
 * Story: 1.1 Library Screen with Book Grid
 * AC: #5, #6, #7, #9
 */

import React from 'react';
import { View, StyleSheet, Dimensions, Image } from 'react-native';
import { Card, Text, Chip, ProgressBar } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import type { Book } from '../types/book';

interface BookCardProps {
  book: Book;
  onPress?: () => void;
}

const SCREEN_WIDTH = Dimensions.get('window').width;
const CARD_WIDTH = (SCREEN_WIDTH - 52) / 2; // 20px padding each side + 12px gap

export const BookCard: React.FC<BookCardProps> = React.memo(({ book, onPress }) => {
  const navigation = useNavigation();

  const handlePress = () => {
    if (onPress) {
      onPress();
    } else {
      navigation.navigate('BookDetail', { bookId: book.id });
    }
  };

  return (
    <Card
      style={styles.card}
      onPress={handlePress}
      accessible={true}
      accessibilityLabel={`${book.title} by ${book.author}. ${book.level} level. ${
        book.isPremium ? 'Premium book.' : 'Free book.'
      }${book.progress ? ` Progress: ${book.progress}%` : ''}`}
      accessibilityRole="button"
    >
      <View style={styles.coverContainer}>
        <Card.Cover
          source={{ uri: book.coverUrl }}
          style={styles.cover}
          resizeMode="cover"
        />
        {book.isPremium && (
          <View style={styles.premiumBadge}>
            <Text style={styles.premiumIcon}>👑</Text>
          </View>
        )}
      </View>

      <Card.Content style={styles.content}>
        <Text variant="titleMedium" numberOfLines={2} style={styles.title}>
          {book.title}
        </Text>
        <Text variant="bodySmall" numberOfLines={1} style={styles.author}>
          {book.author}
        </Text>
        <Chip
          icon="star"
          compact
          style={styles.levelChip}
          textStyle={styles.levelChipText}
        >
          {book.level}
        </Chip>
        {book.progress !== undefined && book.progress > 0 && (
          <ProgressBar
            progress={book.progress / 100}
            color="#EC4899"
            style={styles.progressBar}
            testID="progress-bar"
          />
        )}
      </Card.Content>
    </Card>
  );
}, (prevProps, nextProps) => {
  // Only re-render if book id or progress changed
  return prevProps.book.id === nextProps.book.id &&
         prevProps.book.progress === nextProps.book.progress;
});

BookCard.displayName = 'BookCard';

const styles = StyleSheet.create({
  card: {
    width: CARD_WIDTH,
    margin: 6,
    elevation: 2,
    backgroundColor: '#FFFFFF',
    borderRadius: 8,
    minHeight: 44, // WCAG AAA touch target
  },
  coverContainer: {
    position: 'relative',
  },
  cover: {
    height: 200,
    backgroundColor: '#F5F5F5',
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
  },
  premiumBadge: {
    position: 'absolute',
    top: 8,
    right: 8,
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    borderRadius: 16,
    padding: 4,
    minWidth: 32,
    minHeight: 32,
    justifyContent: 'center',
    alignItems: 'center',
  },
  premiumIcon: {
    fontSize: 20,
  },
  content: {
    paddingTop: 8,
    paddingBottom: 12,
  },
  title: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 16,
    color: '#292524',
    marginBottom: 4,
  },
  author: {
    fontFamily: 'Inter-Regular',
    fontSize: 14,
    color: '#78716C',
    marginBottom: 8,
  },
  levelChip: {
    alignSelf: 'flex-start',
    marginTop: 4,
    backgroundColor: '#FED7AA',
  },
  levelChipText: {
    fontFamily: 'Inter-Regular',
    fontSize: 12,
    color: '#292524',
  },
  progressBar: {
    marginTop: 8,
    height: 4,
    borderRadius: 2,
    backgroundColor: '#FED7AA',
  },
});
