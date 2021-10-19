DROP TABLE IF EXISTS sessions CASCADE;
CREATE TABLE sessions (
  id SERIAL PRIMARY KEY NOT NULL,
  code VARCHAR(6) NOT NULL,
  votes_needed INTEGER NOT NULL,
  votes_computed INTEGER DEFAULT 0,
  participants INTEGER NOT NULL,
  session_size INTEGER NOT NULL,
  user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
  active BOOLEAN DEFAULT TRUE
);
