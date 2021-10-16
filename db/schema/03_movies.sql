DROP TABLE IF EXISTS movies CASCADE;
CREATE TABLE movies (
  id SERIAL PRIMARY KEY NOT NULL,
  unogs_id INTEGER UNIQUE NOT NULL,
  avgrating REAL,
  clist TEXT,
  imdbid VARCHAR(50),
  imbdrating REAL,
  img TEXT,
  nfid INTEGER,
  poster TEXT,
  runtime INTEGER,
  synopsis TEXT,
  title VARCHAR(255),
  titledate DATE,
  top250 INTEGER,
  top250tv INTEGER,
  year INTEGER,
  active BOOLEAN DEFAULT TRUE
);
