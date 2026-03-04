-- Drop existing table (and its policies/indexes) to start fresh
DROP TABLE IF EXISTS guestbook_entries CASCADE;

-- Guestbook entries table
CREATE TABLE guestbook_entries (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  author_name VARCHAR(60) NOT NULL,
  message VARCHAR(280) NOT NULL,
  image_url TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT now() NOT NULL
);

CREATE INDEX idx_guestbook_created_at ON guestbook_entries(created_at DESC);

-- RLS: public read, public insert (with validation), no update/delete
ALTER TABLE guestbook_entries ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public read" ON guestbook_entries
  FOR SELECT USING (true);

CREATE POLICY "Public insert" ON guestbook_entries
  FOR INSERT WITH CHECK (
    char_length(author_name) BETWEEN 1 AND 60
    AND char_length(message) BETWEEN 1 AND 280
  );

-- Storage: create the bucket (public read, 500KB max)
INSERT INTO storage.buckets (id, name, public, file_size_limit)
VALUES ('guestbook-captures', 'guestbook-captures', true, 512000);

-- Storage RLS: allow anonymous uploads (PNG only), no delete/update
CREATE POLICY "Public upload" ON storage.objects
  FOR INSERT WITH CHECK (
    bucket_id = 'guestbook-captures'
    AND (storage.extension(name) = 'png')
  );

CREATE POLICY "Public read" ON storage.objects
  FOR SELECT USING (
    bucket_id = 'guestbook-captures'
  );
