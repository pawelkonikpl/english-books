#!/usr/bin/env python3
"""
Database initialization script.
Creates all tables in the database.
"""
import sys
from pathlib import Path

# Add backend to path
backend_dir = Path(__file__).parent.parent / "backend"
sys.path.insert(0, str(backend_dir))

from db.session import init_db, engine
from config import settings


def main():
    """Initialize the database"""
    print(f"Initializing database at: {settings.DATABASE_URL}")

    # Create data directory if it doesn't exist
    data_dir = Path(backend_dir) / "data"
    data_dir.mkdir(parents=True, exist_ok=True)

    # Also create audio and lessons subdirectories
    (data_dir / "audio").mkdir(exist_ok=True)
    (data_dir / "lessons").mkdir(exist_ok=True)
    (data_dir / "models").mkdir(exist_ok=True)

    # Initialize database (create tables)
    init_db()

    print("✓ Database initialized successfully!")
    print(f"✓ Tables created")

    # Verify tables
    from sqlalchemy import inspect
    inspector = inspect(engine)
    tables = inspector.get_table_names()
    print(f"✓ Created {len(tables)} tables: {', '.join(tables)}")


if __name__ == "__main__":
    main()
