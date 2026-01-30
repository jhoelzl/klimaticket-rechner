-- Add language column to users table
-- This column stores the user's preferred language (e.g., 'en' or 'de')

ALTER TABLE users
ADD COLUMN IF NOT EXISTS language VARCHAR(5) DEFAULT 'en';

-- Add comment to explain the column
COMMENT ON COLUMN users.language IS 'User preferred language code (e.g., en, de)';

-- Optional: Add an index if you plan to query by language frequently
-- CREATE INDEX IF NOT EXISTS idx_users_language ON users(language);
