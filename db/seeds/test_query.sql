SELECT poster, img, title
FROM movie_sessions
JOIN sessions ON sessions.id = session_id
JOIN movies ON movies.id = movies_id
WHERE sessions.code = 'na6ufL'
ORDER BY movie_sessions.id
LIMIT 11;
