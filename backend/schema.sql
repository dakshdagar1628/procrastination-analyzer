CREATE TABLE IF NOT EXISTS activities (
  id SERIAL PRIMARY KEY,
  website_name VARCHAR(255) NOT NULL,
  minutes INTEGER NOT NULL CHECK (minutes > 0),
  category VARCHAR(20) NOT NULL CHECK (category IN ('productive', 'neutral', 'distracting')),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
