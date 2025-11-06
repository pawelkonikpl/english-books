#!/usr/bin/env python3
"""
Seed database with sample lessons and vocabulary.
"""
import sys
from pathlib import Path

# Add backend to path
backend_dir = Path(__file__).parent.parent / "backend"
sys.path.insert(0, str(backend_dir))

from db.session import SessionLocal
from models.database import User, Lesson, VocabularyItem


def seed_data():
    """Seed sample data"""
    db = SessionLocal()

    try:
        # Create sample user
        user = User(
            username="demo_user",
            native_language="pl",
            target_language="en",
            level="beginner"
        )
        db.add(user)

        # Create sample lessons
        lesson1 = Lesson(
            title="Basic Greetings",
            description="Learn common English greetings",
            level="beginner",
            category="conversation",
            estimated_duration=15,
            content={
                "sections": [
                    {
                        "type": "introduction",
                        "text": "In this lesson, you'll learn basic English greetings."
                    },
                    {
                        "type": "vocabulary",
                        "items": ["hello", "goodbye", "good morning", "good evening"]
                    },
                    {
                        "type": "exercise",
                        "questions": [
                            {
                                "question": "How do you greet someone in the morning?",
                                "options": ["Good morning", "Good night", "Goodbye"],
                                "correct": 0
                            }
                        ]
                    }
                ]
            }
        )
        db.add(lesson1)

        lesson2 = Lesson(
            title="Numbers 1-10",
            description="Learn to count from 1 to 10 in English",
            level="beginner",
            category="vocabulary",
            estimated_duration=10,
            content={
                "sections": [
                    {
                        "type": "introduction",
                        "text": "Let's learn numbers in English!"
                    },
                    {
                        "type": "vocabulary",
                        "items": ["one", "two", "three", "four", "five", "six", "seven", "eight", "nine", "ten"]
                    }
                ]
            }
        )
        db.add(lesson2)

        db.flush()  # Get lesson IDs

        # Create vocabulary items
        vocabularies = [
            VocabularyItem(
                word="hello",
                translation="cześć",
                pronunciation="həˈloʊ",
                part_of_speech="interjection",
                difficulty_level="beginner",
                example_sentence="Hello, how are you?",
                lesson_id=lesson1.id
            ),
            VocabularyItem(
                word="goodbye",
                translation="do widzenia",
                pronunciation="ɡʊdˈbaɪ",
                part_of_speech="interjection",
                difficulty_level="beginner",
                example_sentence="Goodbye, see you tomorrow!",
                lesson_id=lesson1.id
            ),
            VocabularyItem(
                word="good morning",
                translation="dzień dobry",
                pronunciation="ɡʊd ˈmɔːrnɪŋ",
                part_of_speech="phrase",
                difficulty_level="beginner",
                example_sentence="Good morning! Did you sleep well?",
                lesson_id=lesson1.id
            ),
            VocabularyItem(
                word="thank you",
                translation="dziękuję",
                pronunciation="θæŋk juː",
                part_of_speech="phrase",
                difficulty_level="beginner",
                example_sentence="Thank you for your help!"
            ),
        ]

        for vocab in vocabularies:
            db.add(vocab)

        db.commit()

        print("✓ Sample data seeded successfully!")
        print(f"  - Created 1 user")
        print(f"  - Created 2 lessons")
        print(f"  - Created {len(vocabularies)} vocabulary items")

    except Exception as e:
        db.rollback()
        print(f"✗ Error seeding data: {e}")
        raise
    finally:
        db.close()


def main():
    """Main function"""
    print("Seeding database with sample data...")
    seed_data()


if __name__ == "__main__":
    main()
