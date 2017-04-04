DROP DATABASE IF EXISTS restaurants_api;
CREATE DATABASE restaurants_api;

\c restaurants_api;

CREATE TABLE areas (
    id SERIAL PRIMARY KEY,
    area VARCHAR(25)
);

CREATE TABLE restaurants (
    id SERIAL PRIMARY KEY,
    name VARCHAR(25),
    area_id INTEGER,
    cuisine VARCHAR(25),
    website TEXT,
    FOREIGN KEY (area_id) REFERENCES areas(id)
);

CREATE TABLE comments (
    id SERIAL PRIMARY KEY, 
    restaurant_id INT,
    body VARCHAR(255),
    created_at DATE NOT NULL DEFAULT CURRENT_TIMESTAMP
);

INSERT INTO areas (area)
    VALUES ('Stockport'), ('Central Manchester'), ('Sale'), ('Failsworth'), ('Eccles'), ('Ashton-under-Lyne');

INSERT INTO restaurants (name, area_id, cuisine, website)
    VALUES ('Curry Culture', 1, 'Indian', 'www.curry-culture.com'), 
    ('The Midway', 1, 'Mediterranean', 'www.themidway.co.uk'), 
    ('Teppanyaki Chinatown', 2, 'Japanese', 'www.teppanyakichinatown.com'),
    ('Asha''s', 2, 'Indian', 'www.ashasrestaurant.co.uk'), 
    ('Bianco Pizza and Coffee', 3, 'Italian', 'www.barbianco.webnode.it'),
    ('Madras Spice', 3, 'Indian', 'https://www.facebook.com/Madras-Spice-1022871834424199/'), 
    ('The Old School BBQ Bus', 4, 'American', 'https://www.facebook.com/Theoldschoolbbqbus'),
    ('Gossip', 4, 'Thai', 'www.gossiponbroadway.com'),
    ('Smiths', 5, 'British', 'www.smithsrestaurant.net'),
    ('La Turka Bistro', 5, 'Turkish', 'www.laturka.co.uk'),
    ('Mozaic Cafe and Deli', 6, 'Mediterranean', 'www.cafemozaic.co.uk'),
    ('Pinocchio Ristorante', 6, 'Italian', 'www.pinocchiorestaurantashton.com');

INSERT INTO comments (restaurant_id, body)
    VALUES (1, 'Great curry!'), (1, 'Terrible curry!'), 
    (2, 'Foreign muck.'), (2, 'Delicious!'),
    (3, 'Good sushi!'), (3, 'Reminded me of my trip to Tokyo!!! :D'),
    (4, 'Much better than Curry Culture'), (4, 'Like used lumpy engine oil'),
    (5, 'Lovely margherita'), (5, 'nice'),
    (6, 'Too spicey!!!'), (6, 'My favourite indian in all of Manchester, much better than Curry Culutre'), 
    (7, 'you wait all morning for an old school bbq bus and then two come at once'), (7, 'too sweet'), 
    (8, 'very quiet, no atmosphere'), (8, 'great pad thai'),
    (9, 'makes me proud to be british'), (9, 'makes me ashamed to be British'), 
    (10, 'lovely kebab'), (10, 'lovely kebabs'),
    (11, 'nice coffee, terrible deli'), (11, 'not very authentic'),
    (12, 'couldnt find the website so didnt bother'), (12, 'Pinocchios not doing much for his reputation as an honest boy. Fresh meat my arse');





SELECT * FROM areas;
SELECT * FROM restaurants;
SELECT * FROM comments;