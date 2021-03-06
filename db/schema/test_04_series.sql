DROP TABLE IF EXISTS series CASCADE;
CREATE TABLE series (
  id SERIAL PRIMARY KEY NOT NULL,
  unogs_id INTEGER UNIQUE NOT NULL,
  avgrating REAL,
  imdbid VARCHAR(50),
  imdbrating REAL,
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
