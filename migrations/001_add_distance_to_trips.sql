-- Migration: Add distance field to trips table
-- Description: Adds optional distance column for accurate CO2 tracking
-- Date: 2026-01-30
-- Status: PENDING - Run this in Supabase SQL Editor

-- Add distance column to trips table
ALTER TABLE trips ADD COLUMN distance DECIMAL(10,1);

-- Add comment to document the column
COMMENT ON COLUMN trips.distance IS 'Distance in kilometers for carbon tracking (optional). Used for accurate CO2 emissions calculation.';

-- Create index for efficient queries
CREATE INDEX idx_trips_distance ON trips(distance);

-- Create index on user_id and distance for carbon analysis
CREATE INDEX idx_trips_user_distance ON trips(user_id, distance);

-- Optional: Add RLS policy if you need to restrict distance visibility
-- ALTER POLICY "Users can view own trips" ON trips USING (auth.uid() = user_id);
