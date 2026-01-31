CREATE TABLE IF NOT EXISTS blog_posts (
  id SERIAL PRIMARY KEY,
  slug TEXT UNIQUE NOT NULL,
  title TEXT NOT NULL,
  meta_title TEXT NOT NULL,
  meta_description TEXT NOT NULL,
  excerpt TEXT NOT NULL,
  intent TEXT NOT NULL DEFAULT 'Article',
  cover_image_url TEXT,
  content_markdown TEXT NOT NULL,
  published BOOLEAN NOT NULL DEFAULT TRUE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
