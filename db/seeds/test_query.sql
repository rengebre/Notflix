-- INSERT INTO movies (
--   unogs_id,
--   avgrating,
--   imdbid,
--   imdbrating,
--   img,
--   nfid,
--   poster,
--   runtime,
--   synopsis,
--   title,
--   titledate,
--   top250,
--   top250tv,
--   year)
-- VALUES (74666, 0, 'tt6461824', 7.2,'https://occ-0-4039-41.1.nflxso.net/dnm/api/v6/evlCitJPPCVCry0BZlEFb5-QjKc/AAAABdqylJat9Vi61jOf7mMguQwY8JCPbNgDa_C5D5QqlZ1Y-nJPTq-AzbTquFEMGCzXZbpl9cx8bWdgaHesk6c0Hmr4Gw.jpg?r=015', 81504294, 'https://m.media-amazon.com/images/M/MV5BMjIxMjMxMTc1OF5BMl5BanBnXkFtZTgwNzg1Mjg1NDM@._V1_SX300.jpg', 651, 'Three Palestinian siblings eagerly attempt to visit their bedridden grandfather who resides on the other side of the separation wall.', 'The Crossing', '2021-10-14', null, null, 2017)
-- ON CONFLICT (unogs_id) DO UPDATE
--   SET unogs_id = EXCLUDED.unogs_id
-- RETURNING id, unogs_id;

UPDATE movie_sessions
SET likes = 1 + (
  SELECT likes FROM movie_sessions
  JOIN movies ON movies.id = movies_id
  WHERE title = $1
  )
  WHERE movies_id = (SELECT id FROM movies WHERE title = $1)
  RETURNING likes;
