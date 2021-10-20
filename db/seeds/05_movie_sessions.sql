DROP TABLE IF EXISTS movie_sessions CASCADE;
CREATE TABLE movie_sessions (
  id SERIAL PRIMARY KEY NOT NULL,
  movies_id INTEGER REFERENCES movies(id) ON DELETE CASCADE,
  session_id INTEGER REFERENCES sessions(id) ON DELETE CASCADE,
  likes INTEGER DEFAULT 0
);

INSERT INTO movie_sessions (movies_id, session_id) VALUES (3452, 1);
INSERT INTO movie_sessions (movies_id, session_id) VALUES (260, 1);
INSERT INTO movie_sessions (movies_id, session_id) VALUES (354, 1);
INSERT INTO movie_sessions (movies_id, session_id) VALUES (361, 1);
INSERT INTO movie_sessions (movies_id, session_id) VALUES (572, 1);
INSERT INTO movie_sessions (movies_id, session_id) VALUES (622, 1);
INSERT INTO movie_sessions (movies_id, session_id) VALUES (674, 1);
INSERT INTO movie_sessions (movies_id, session_id) VALUES (972, 1);
INSERT INTO movie_sessions (movies_id, session_id) VALUES (940, 1);
INSERT INTO movie_sessions (movies_id, session_id) VALUES (1086, 1);
INSERT INTO movie_sessions (movies_id, session_id) VALUES (999, 1);
INSERT INTO movie_sessions (movies_id, session_id) VALUES (1610, 1);
INSERT INTO movie_sessions (movies_id, session_id) VALUES (1684, 1);
INSERT INTO movie_sessions (movies_id, session_id) VALUES (1934, 1);
INSERT INTO movie_sessions (movies_id, session_id) VALUES (2138, 1);
INSERT INTO movie_sessions (movies_id, session_id) VALUES (2352, 1);
INSERT INTO movie_sessions (movies_id, session_id) VALUES (2368, 1);
INSERT INTO movie_sessions (movies_id, session_id) VALUES (2373, 1);
INSERT INTO movie_sessions (movies_id, session_id) VALUES (2326, 1);
INSERT INTO movie_sessions (movies_id, session_id) VALUES (2384, 1);
INSERT INTO movie_sessions (movies_id, session_id) VALUES (2503, 1);
INSERT INTO movie_sessions (movies_id, session_id) VALUES (2522, 1);
INSERT INTO movie_sessions (movies_id, session_id) VALUES (2715, 1);
INSERT INTO movie_sessions (movies_id, session_id) VALUES (2782, 1);
INSERT INTO movie_sessions (movies_id, session_id) VALUES (2946, 1);
INSERT INTO movie_sessions (movies_id, session_id) VALUES (3032, 1);
