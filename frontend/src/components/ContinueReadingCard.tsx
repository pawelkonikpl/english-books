/**
 * ContinueReadingCard Component - Resume reading card
 * Source: docs/tech-spec-epic-1-frontend.md#ContinueReadingCard
 * Story: 1.1 Library Screen with Book Grid
 * AC: #2, #3
 */

import React from 'react';
import { View, StyleSheet, Image } from 'react-native';
import { Card, Text, Button, ProgressBar } from 'react-native-paper';
import LinearGradient from 'react-native-linear-gradient';
import type { Book } from '../types/book';

interface ContinueReadingCardProps {
  book: Book;
  onPress: () => void;
}

export const ContinueReadingCard: React.FC<ContinueReadingCardProps> = ({ book, onPress }) => {
  if (!book) return null; // AC #3: Hidden if no book

  return (
    <Card style={styles.card} mode="elevated" elevation={3}>
      <LinearGradient
        colors={['#EC4899', '#F59E0B']}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.gradient}
      >
        <Card.Title
          title="Continue Reading"
          titleStyle={styles.title}
          titleVariant="headlineSmall"
        />
        <Card.Content style={styles.content}>
          <Image source={{ uri: book.coverUrl }} style={styles.thumbnail} />
          <View style={styles.info}>
            <Text variant="titleMedium" style={styles.bookTitle} numberOfLines={2}>
              {book.title}
            </Text>
            <Text variant="bodySmall" style={styles.chapterInfo}>
              {book.currentChapter} · {book.progress}%
            </Text>
            <ProgressBar
              progress={(book.progress || 0) / 100}
              color="#FFFFFF"
              style={styles.progressBar}
            />
          </View>
        </Card.Content>
        <Card.Actions style={styles.actions}>
          <Button
            mode="contained"
            onPress={onPress}
            icon="play"
            style={styles.button}
            labelStyle={styles.buttonLabel}
            contentStyle={styles.buttonContent}
            accessibilityLabel={`Continue reading ${book.title}`}
            accessibilityRole="button"
          >
            Continue Reading →
          </Button>
        </Card.Actions>
      </LinearGradient>
    </Card>
  );
};

const styles = StyleSheet.create({
  card: {
    margin: 16,
    marginBottom: 8,
    borderRadius: 12,
    overflow: 'hidden',
  },
  gradient: {
    borderRadius: 12,
  },
  title: {
    fontFamily: 'Poppins-Bold',
    fontSize: 20,
    color: '#FFFFFF',
  },
  content: {
    flexDirection: 'row',
    gap: 12,
    paddingHorizontal: 16,
    paddingBottom: 12,
  },
  thumbnail: {
    width: 60,
    height: 90,
    borderRadius: 4,
    backgroundColor: '#FFFFFF',
  },
  info: {
    flex: 1,
    justifyContent: 'center',
  },
  bookTitle: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 18,
    color: '#FFFFFF',
    marginBottom: 4,
  },
  chapterInfo: {
    fontFamily: 'Inter-Regular',
    fontSize: 14,
    color: 'rgba(255, 255, 255, 0.9)',
    marginBottom: 8,
  },
  progressBar: {
    height: 6,
    borderRadius: 3,
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
  },
  actions: {
    paddingHorizontal: 16,
    paddingBottom: 16,
    justifyContent: 'flex-end',
  },
  button: {
    backgroundColor: '#FFFFFF',
    minHeight: 48, // WCAG AAA touch target
  },
  buttonLabel: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 16,
    color: '#EC4899',
  },
  buttonContent: {
    paddingVertical: 8,
  },
});
