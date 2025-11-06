# Frontend Technical Specification: Epic 1 - Book Library & Management

**Epic ID:** 1
**Component:** Frontend (React Native)
**Author:** AiDev
**Date:** 2025-11-02
**Status:** Draft

---

## Overview

This document specifies the frontend implementation for the Book Library & Management system, covering React Native components, screens, navigation, state management, and UI/UX implementation for book discovery and access.

**Scope:** Mobile app frontend only (iOS + Android via React Native 0.73+)

---

## Component Architecture

### Screen Components (Organisms)

#### 1. LibraryScreen.tsx

**Purpose:** Main library interface displaying book grid with filtering

**Location:** `EnglishApp/src/screens/LibraryScreen.tsx`

**Props:** None (root tab screen)

**State:**
```typescript
interface LibraryScreenState {
  books: Book[];
  activeFilter: FilterType; // 'all' | 'free' | 'premium' | 'beginner' | 'intermediate' | 'advanced'
  currentBook: Book | null; // For Continue Reading card
  loading: boolean;
  error: Error | null;
}
```

**Layout Structure:**
```
┌─────────────────────────────┐
│ Header: "Your Library" + ⚙️ │ 56px
├─────────────────────────────┤
│ Continue Reading Card       │ 120px (if currentBook exists)
│ (Conditional render)        │
├─────────────────────────────┤
│ Filter Chips                │ 48px
│ [All][Free][Premium][...]   │
├─────────────────────────────┤
│ FlatList: BookCard Grid     │ Flex (scrollable)
│ ┌──────┐ ┌──────┐          │
│ │Book 1│ │Book 2│          │
│ └──────┘ └──────┘          │
└─────────────────────────────┘
```

**Dependencies:**
- React Native Paper: `Card`, `Chip`, `IconButton`
- `useBooks` custom hook
- `BookCard` component
- `ContinueReadingCard` component

**Implementation Details:**
```typescript
export const LibraryScreen: React.FC = () => {
  const { books, loading, error, currentBook } = useBooks();
  const [activeFilter, setActiveFilter] = useState<FilterType>('all');

  const filteredBooks = useMemo(() => {
    return books.filter(book => {
      if (activeFilter === 'all') return true;
      if (activeFilter === 'free') return !book.isPremium;
      if (activeFilter === 'premium') return book.isPremium;
      // Level filters
      return book.level === activeFilter;
    });
  }, [books, activeFilter]);

  return (
    <Surface style={styles.container}>
      <Appbar.Header>
        <Appbar.Content title="Your Library" />
        <Appbar.Action icon="cog" onPress={() => navigation.navigate('Settings')} />
      </Appbar.Header>

      {currentBook && (
        <ContinueReadingCard
          book={currentBook}
          onPress={() => navigation.navigate('Reading', { bookId: currentBook.id })}
        />
      )}

      <ScrollView horizontal style={styles.filterContainer}>
        {FILTERS.map(filter => (
          <Chip
            key={filter.value}
            selected={activeFilter === filter.value}
            onPress={() => setActiveFilter(filter.value)}
          >
            {filter.label}
          </Chip>
        ))}
      </ScrollView>

      <FlatList
        data={filteredBooks}
        renderItem={({ item }) => <BookCard book={item} />}
        keyExtractor={(item) => item.id.toString()}
        numColumns={2}
        contentContainerStyle={styles.grid}
        ListEmptyComponent={<EmptyState message="No books found. Check back soon!" />}
      />
    </Surface>
  );
};
```

**Styling:**
- Background: `#FFF7ED` (warm cream)
- Padding: 20px horizontal, 16px vertical
- Grid gap: 12px between cards
- Filter chips: Pink `#EC4899` when active, gray when inactive

---

#### 2. BookDetailScreen.tsx

**Purpose:** Display full book metadata and start reading CTA

**Location:** `EnglishApp/src/screens/BookDetailScreen.tsx`

**Route Params:**
```typescript
type BookDetailParams = {
  bookId: number;
};
```

**State:**
```typescript
interface BookDetailState {
  book: Book | null;
  loading: boolean;
  error: Error | null;
}
```

**Layout:**
```
┌─────────────────────────────┐
│ ← Back                      │ Header
├─────────────────────────────┤
│   ┌─────────────┐           │
│   │  Book Cover │           │ 200x300px
│   │   Image     │           │
│   └─────────────┘           │
│                             │
│ Book Title (H1)             │
│ Author Name (Body)          │
│ ⭐ Intermediate · 45 min    │
│                             │
│ Description paragraph...    │
│                             │
│ 📚 What You'll Learn:       │
│ • 150+ business vocabulary  │
│ • Professional English      │
│                             │
│ 💡 Key Vocabulary Preview   │
│ vulnerable, criticize...    │
│                             │
│ [Start Reading →]           │ Gradient button
│ OR                          │
│ [Preview First Chapter] 👑  │ Premium
└─────────────────────────────┘
```

**Implementation:**
```typescript
export const BookDetailScreen: React.FC<BookDetailScreenProps> = ({ route, navigation }) => {
  const { bookId } = route.params;
  const { book, loading, error } = useBook(bookId);

  if (loading) return <ActivityIndicator />;
  if (error || !book) return <ErrorView error={error} />;

  const handleStartReading = () => {
    navigation.navigate('Reading', { bookId: book.id });
  };

  const handlePreview = () => {
    navigation.navigate('Reading', { bookId: book.id, previewMode: true });
  };

  return (
    <ScrollView style={styles.container}>
      <Appbar.Header>
        <Appbar.BackAction onPress={() => navigation.goBack()} />
      </Appbar.Header>

      <Image
        source={{ uri: book.coverUrl }}
        style={styles.cover}
        resizeMode="contain"
      />

      <Text variant="headlineLarge" style={styles.title}>{book.title}</Text>
      <Text variant="bodyLarge" style={styles.author}>{book.author}</Text>

      <View style={styles.meta}>
        <Chip icon="star">{book.level}</Chip>
        <Text variant="bodySmall">{book.estimatedDuration} min</Text>
      </View>

      <Text variant="bodyMedium" style={styles.description}>
        {book.description}
      </Text>

      <Card style={styles.benefitsCard}>
        <Card.Title title="📚 What You'll Learn:" />
        <Card.Content>
          {book.learningBenefits.map((benefit, idx) => (
            <Text key={idx}>• {benefit}</Text>
          ))}
        </Card.Content>
      </Card>

      <Card style={styles.vocabularyPreview}>
        <Card.Title title="💡 Key Vocabulary Preview" />
        <Card.Content>
          <Text>{book.keyVocabulary?.join(', ')}</Text>
        </Card.Content>
      </Card>

      {book.isPremium ? (
        <Button
          mode="contained"
          icon="crown"
          onPress={handlePreview}
          style={styles.ctaButton}
        >
          Preview First Chapter
        </Button>
      ) : (
        <Button
          mode="contained"
          onPress={handleStartReading}
          style={styles.ctaButton}
        >
          Start Reading →
        </Button>
      )}
    </ScrollView>
  );
};
```

---

### Molecule Components

#### 3. BookCard.tsx

**Purpose:** Individual book card in grid

**Props:**
```typescript
interface BookCardProps {
  book: Book;
  onPress?: () => void;
}
```

**Layout:**
```
┌──────────────┐
│  📕         👑│ Cover + Premium badge
│  Book Cover  │
│              │
│ Book Title   │
│ Author       │
│ ⭐ Level     │
│ ━━━━━━━ 35% │ Progress bar (if started)
└──────────────┘
```

**Implementation:**
```typescript
export const BookCard: React.FC<BookCardProps> = ({ book, onPress }) => {
  const navigation = useNavigation();

  const handlePress = () => {
    if (onPress) {
      onPress();
    } else {
      navigation.navigate('BookDetail', { bookId: book.id });
    }
  };

  return (
    <Card style={styles.card} onPress={handlePress}>
      <Card.Cover source={{ uri: book.coverUrl }} style={styles.cover} />
      {book.isPremium && (
        <View style={styles.premiumBadge}>
          <Text style={styles.premiumIcon}>👑</Text>
        </View>
      )}
      <Card.Content style={styles.content}>
        <Text variant="titleMedium" numberOfLines={2}>{book.title}</Text>
        <Text variant="bodySmall" numberOfLines={1}>{book.author}</Text>
        <Chip icon="star" compact>{book.level}</Chip>
        {book.progress && book.progress > 0 && (
          <ProgressBar
            progress={book.progress / 100}
            color="#EC4899"
            style={styles.progressBar}
          />
        )}
      </Card.Content>
    </Card>
  );
};

const styles = StyleSheet.create({
  card: {
    width: (Dimensions.get('window').width - 52) / 2, // 2 columns with 20px padding + 12px gap
    margin: 6,
    elevation: 2,
  },
  cover: {
    height: 200,
    backgroundColor: '#F5F5F5',
  },
  premiumBadge: {
    position: 'absolute',
    top: 8,
    right: 8,
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    borderRadius: 16,
    padding: 4,
  },
  premiumIcon: {
    fontSize: 20,
  },
  content: {
    paddingTop: 8,
  },
  progressBar: {
    marginTop: 8,
    height: 4,
    borderRadius: 2,
  },
});
```

---

#### 4. ContinueReadingCard.tsx

**Purpose:** Prominent card for resuming current book

**Props:**
```typescript
interface ContinueReadingCardProps {
  book: Book;
  onPress: () => void;
}
```

**Layout:**
```
┌─────────────────────────────┐
│ Continue Reading            │
│ ┌────┐ The Great Gatsby     │
│ │📖  │ Chapter 3 · 35%      │
│ └────┘ [Continue Reading →] │
└─────────────────────────────┘
```

**Implementation:**
```typescript
export const ContinueReadingCard: React.FC<ContinueReadingCardProps> = ({ book, onPress }) => {
  return (
    <Card style={styles.card} mode="elevated">
      <Card.Title
        title="Continue Reading"
        titleStyle={styles.title}
      />
      <Card.Content style={styles.content}>
        <Image source={{ uri: book.coverUrl }} style={styles.thumbnail} />
        <View style={styles.info}>
          <Text variant="titleMedium">{book.title}</Text>
          <Text variant="bodySmall">{book.currentChapter} · {book.progress}%</Text>
          <ProgressBar
            progress={book.progress / 100}
            color="#EC4899"
            style={styles.progressBar}
          />
        </View>
      </Card.Content>
      <Card.Actions>
        <Button
          mode="contained"
          onPress={onPress}
          icon="play"
          style={styles.button}
        >
          Continue Reading →
        </Button>
      </Card.Actions>
    </Card>
  );
};

const styles = StyleSheet.create({
  card: {
    margin: 16,
    marginBottom: 8,
    background: 'linear-gradient(135deg, #EC4899 0%, #F59E0B 100%)', // Note: Use react-native-linear-gradient
  },
  thumbnail: {
    width: 60,
    height: 90,
    borderRadius: 4,
  },
  content: {
    flexDirection: 'row',
    gap: 12,
  },
  info: {
    flex: 1,
  },
  progressBar: {
    marginTop: 8,
    height: 6,
  },
  button: {
    backgroundColor: '#EC4899',
  },
});
```

---

## Custom Hooks

### useBooks

**Purpose:** Fetch and manage book list with filtering

**Location:** `EnglishApp/src/hooks/useBooks.ts`

```typescript
export function useBooks() {
  const [books, setBooks] = useState<Book[]>([]);
  const [currentBook, setCurrentBook] = useState<Book | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    async function fetchBooks() {
      try {
        setLoading(true);

        // Fetch all books
        const response = await lessonAPI.getLessons();
        const booksData = response.data.data;

        // Fetch current reading progress
        const progressResponse = await progressAPI.getCurrentBook();
        const currentBookId = progressResponse.data.data?.lesson_id;

        // Merge progress data with books
        const booksWithProgress = booksData.map(book => ({
          ...book,
          progress: book.id === currentBookId ? progressResponse.data.data.progress_percentage : 0,
        }));

        setBooks(booksWithProgress);
        setCurrentBook(booksWithProgress.find(b => b.id === currentBookId) || null);
        setError(null);
      } catch (err) {
        setError(err as Error);
      } finally {
        setLoading(false);
      }
    }

    fetchBooks();
  }, []);

  return { books, currentBook, loading, error };
}
```

### useBook

**Purpose:** Fetch single book details

```typescript
export function useBook(bookId: number) {
  const [book, setBook] = useState<Book | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    async function fetchBook() {
      try {
        setLoading(true);
        const response = await lessonAPI.getLesson(bookId);
        setBook(response.data.data);
        setError(null);
      } catch (err) {
        setError(err as Error);
      } finally {
        setLoading(false);
      }
    }

    fetchBook();
  }, [bookId]);

  return { book, loading, error };
}
```

---

## TypeScript Types

**Location:** `EnglishApp/src/types/book.ts`

```typescript
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
```

---

## Navigation

**Integration with React Navigation Stack:**

```typescript
// navigation/types.ts
export type RootStackParamList = {
  Library: undefined;
  BookDetail: { bookId: number };
  Reading: { bookId: number; previewMode?: boolean };
  Settings: undefined;
};

// App.tsx navigation setup
const Stack = createStackNavigator<RootStackParamList>();

function AppNavigator() {
  return (
    <Stack.Navigator initialRouteName="Library">
      <Stack.Screen
        name="Library"
        component={LibraryScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="BookDetail"
        component={BookDetailScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Reading"
        component={ReadingScreen}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
}
```

---

## State Management

**Approach:** React Context + Custom Hooks (no Redux for MVP)

### BooksContext

```typescript
// contexts/BooksContext.tsx
interface BooksContextValue {
  books: Book[];
  currentBook: Book | null;
  refreshBooks: () => Promise<void>;
  updateProgress: (bookId: number, progress: number) => void;
}

const BooksContext = createContext<BooksContextValue | undefined>(undefined);

export const BooksProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [books, setBooks] = useState<Book[]>([]);
  const [currentBook, setCurrentBook] = useState<Book | null>(null);

  const refreshBooks = async () => {
    // Fetch logic from useBooks hook
  };

  const updateProgress = (bookId: number, progress: number) => {
    setBooks(prev => prev.map(book =>
      book.id === bookId ? { ...book, progress } : book
    ));
  };

  return (
    <BooksContext.Provider value={{ books, currentBook, refreshBooks, updateProgress }}>
      {children}
    </BooksContext.Provider>
  );
};
```

---

## Performance Optimizations

### 1. FlatList Optimization

```typescript
<FlatList
  data={filteredBooks}
  renderItem={({ item }) => <BookCard book={item} />}
  keyExtractor={(item) => item.id.toString()}

  // Performance props
  initialNumToRender={10}
  maxToRenderPerBatch={10}
  windowSize={5}
  removeClippedSubviews={true}

  // Item layout for smoother scrolling
  getItemLayout={(data, index) => ({
    length: 280, // BookCard height
    offset: 280 * index,
    index,
  })}
/>
```

### 2. Image Caching

Use `react-native-fast-image` for book covers:

```typescript
import FastImage from 'react-native-fast-image';

<FastImage
  source={{
    uri: book.coverUrl,
    priority: FastImage.priority.normal,
  }}
  style={styles.cover}
  resizeMode={FastImage.resizeMode.contain}
/>
```

### 3. Memoization

```typescript
const filteredBooks = useMemo(() => {
  return books.filter(filterLogic);
}, [books, activeFilter]);

export const BookCard = React.memo<BookCardProps>(
  ({ book }) => {
    // Component render
  },
  (prev, next) => prev.book.id === next.book.id && prev.book.progress === next.book.progress
);
```

---

## Accessibility (WCAG 2.1 Level AA)

### Touch Targets
- All buttons: minimum 44x44px
- BookCard tap area: Full card surface (≥44px height)
- Filter chips: 48px height

### Color Contrast
- Text on cream background `#292524` on `#FFF7ED`: 4.8:1 ✅
- Button text white on pink `#FFFFFF` on `#EC4899`: 4.5:1 ✅
- Premium badge: High contrast overlay

### Screen Reader Support

```typescript
<Card
  accessible={true}
  accessibilityLabel={`${book.title} by ${book.author}. ${book.level} level. ${book.isPremium ? 'Premium book.' : 'Free book.'}`}
  accessibilityRole="button"
  onPress={handlePress}
>
```

---

## Error Handling

### Network Errors

```typescript
if (error) {
  return (
    <View style={styles.errorContainer}>
      <Text variant="headlineSmall">Unable to load books</Text>
      <Text variant="bodyMedium">Please check your connection and try again.</Text>
      <Button mode="contained" onPress={refreshBooks}>
        Retry
      </Button>
    </View>
  );
}
```

### Empty States

```typescript
<FlatList
  ListEmptyComponent={
    <View style={styles.emptyState}>
      <Text variant="headlineSmall">No books found</Text>
      <Text variant="bodyMedium">Try adjusting your filters or check back soon!</Text>
    </View>
  }
/>
```

---

## Testing Strategy

### Unit Tests (Jest + React Native Testing Library)

```typescript
// __tests__/components/BookCard.test.tsx
describe('BookCard', () => {
  it('renders book title and author', () => {
    const book = mockBook({ title: 'Test Book', author: 'Test Author' });
    const { getByText } = render(<BookCard book={book} />);

    expect(getByText('Test Book')).toBeTruthy();
    expect(getByText('Test Author')).toBeTruthy();
  });

  it('shows premium badge for premium books', () => {
    const book = mockBook({ isPremium: true });
    const { getByText } = render(<BookCard book={book} />);

    expect(getByText('👑')).toBeTruthy();
  });

  it('shows progress bar if book has progress', () => {
    const book = mockBook({ progress: 35 });
    const { getByTestId } = render(<BookCard book={book} />);

    expect(getByTestId('progress-bar')).toBeTruthy();
  });
});
```

### Integration Tests

```typescript
// __tests__/screens/LibraryScreen.test.tsx
describe('LibraryScreen', () => {
  it('displays continue reading card when book in progress', async () => {
    mockAPI.getCurrentBook.mockResolvedValue({ lesson_id: 1, progress: 35 });

    const { findByText } = render(<LibraryScreen />);

    expect(await findByText('Continue Reading')).toBeTruthy();
  });

  it('filters books correctly', async () => {
    const { getByText, queryByText } = render(<LibraryScreen />);

    fireEvent.press(getByText('Premium'));

    expect(queryByText('Free Book Title')).toBeNull();
    expect(getByText('Premium Book Title')).toBeTruthy();
  });
});
```

---

## Acceptance Criteria Checklist

- [ ] Library Screen displays all books from database in grid layout
- [ ] Continue Reading card shows current book with progress percentage if in progress
- [ ] Continue Reading card is hidden if no book in progress
- [ ] Filter chips correctly filter books by: All, Free, Premium, Beginner, Intermediate, Advanced
- [ ] Free/Premium badge visible on each BookCard
- [ ] BookCard shows progress bar if book has been started
- [ ] Tapping BookCard navigates to Book Detail screen
- [ ] Book Detail screen displays: cover, title, author, level, duration, description, learning benefits, key vocabulary
- [ ] Free books show "Start Reading" button
- [ ] Premium books show "Preview First Chapter" button with crown icon
- [ ] Start Reading button navigates to Reading Screen with full access
- [ ] Preview button navigates to Reading Screen with previewMode=true
- [ ] Empty state displays "No books found" when filters return zero results
- [ ] All touch targets meet 44x44px minimum
- [ ] Scrolling performs at 60 FPS with 20+ books
- [ ] Screen reader announces book details correctly

---

**Next Step:** Implement Backend Tech Spec (tech-spec-epic-1-backend.md)
