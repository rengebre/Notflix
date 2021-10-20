-- SELECT
--   sessions.votes_computed,
--   movie_sessions.likes,
--   movies.title
-- FROM movie_sessions
-- JOIN sessions ON sessions.id = session_id
-- JOIN movies ON movies.id = movies_id
-- WHERE movies.title = 'The Matrix';

-- UPDATE (
--   SELECT
--   sessions.votes_computed as votes_computed,
--   movie_sessions.likes as likes,
--   movies.title
-- FROM movie_sessions
-- JOIN sessions ON sessions.id = session_id
-- JOIN movies ON movies.id = movies_id
-- WHERE movies.title = 'The Matrix';
-- )
-- SET votes_computed = 1 + votes_computed;

UPDATE movie_sessions
SET likes = 1 + (
  SELECT likes FROM movie_sessions
  JOIN movies ON movies.id = movies_id
  WHERE title = 'The Matrix'
  )
WHERE movies_id = (SELECT id FROM movies WHERE title = 'The Matrix')
RETURNING likes;
