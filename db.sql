DROP DATABASE IF EXISTS fake_news_api;
CREATE DATABASE fake_news_api;

\c fake_news_api;

CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  first_name VARCHAR (20) NOT NULL,
  last_name VARCHAR (20) NOT NULL,
  username VARCHAR (30) NOT NULL,
  password VARCHAR (50) NOT NULL,
  email VARCHAR (40) NOT NULL,
  moderator BOOLEAN NOT NULL,
  join_date DATE NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE articles (
  id SERIAL PRIMARY KEY,
  url VARCHAR,
  comment VARCHAR (2000),
  reliability BOOLEAN NOT NULL,
  post_date DATE NOT NULL DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(id)
);

CREATE TABLE evidence (
  id SERIAL PRIMARY KEY,
  evidence VARCHAR,
  FOREIGN KEY (article_id) REFERENCES articles(id),
);

CREATE TABLE base_urls (
  id SERIAL PRIMARY KEY,
  base_url VARCHAR,
  reliability INT NOT NULL,
);

INSERT INTO users (first_name, last_name, username, password, email, moderator)
VALUES
  ('Davey', 'Joses', 'djones', 'dj2017', 'dj@gmail.com', true),
  ('Dewe', 'Lilly', 'lillypod', 'fgloki', 'lilly@gmail.co.uk', true ),
  ('Matty', 'Mathews', 'mattythecow', 'jdcndsc', 'matty@gmil.co.uk', true),
  ('HellCat', 'tilly', 'fireHawk', 'sansjsdn', 'hellcat@gmail.com', false);

INSERT INTO articles (url, comment, reliability)
VALUES
  ('hellcats.com', 'ashbabdibdsajhvwhddh', true),
  ('hellodogs.com', 'shjaBSJBJSBJSABSJKB', false),
  ('helloparats.com', 'saddfdasdsdasdasdd', true),
  ('hellohippo.com', 'dsjnsdfjasfdkjbdjds', false);

INSERT INTO evidence (evidence, article_id)
VALUES
  ('bobbins.com/great_story', 1),
  ('nobbins.com/terrible_story', 2),
  ('fobbins.com/the_best_article', 3),
  ('hobbins.com/awful_awful_story', 4);

INSERT INTO base_urls (base_url, reliability)
  VALUES
  ('bobbins.com', 45),
  ('nobbins.com', 21),
  ('fobbins.com', 78),
  ('hobbins.com', 11);

SELECT * FROM users;
SELECT * FROM articles;
SELECT * FROM evidence;
SELECT * FROM base_urls;
  

