# Rated Restaurants

## A micro [yelp](https://www.yelp.co.uk/c/manchester/restaurants) clone API using Express and SQL

### Background

We are going to build an API which shows ratings, comments and cuisine for restaurants in the Greater Manchester area.
For this Sprint we will be using [PostgreSQL](https://www.postgresql.org/) and [pg-promise](https://www.npmjs.com/package/pg-promise) with 
the [Bluebird promise library](http://bluebirdjs.com/docs/getting-started.html)

### W3 Schools

When we are looking for in depth knowledge on JavaScript we avoid W3 Schools like the plague! W3 Schools is in-fact a very good resource for referencing and learning SQL. [Here is the link](http://www.w3schools.com/sql/default.asp)

### Goals

1. Build up SQL schemas to create the tables for your database.
2. Learn more about queries written in SQL.
3. Make post requests and validate you data before it fails your schema.
4. Solidify your knowledge of building and writing tests for APIs.
5. Learn how to manage SQL migrations as we cannot just DROP the database when we need to alter it!

### Steps
1. Database schemas to create the tables we will need
2. A SEED file to put some development data into your database
3. Router for the API
4. Controllers for each route.
5. Write a Query for each data set you will require. We would usually export this from a `lib` directory in a `queries.js` file
6. Connect to your database with the pg-promise library
7. Return or insert/update the data required for each route as described below.

### Testing Steps

1. Set you ENV variables to connect to a separate test database as we did in the Northcoder's News API sprint
2. Write a seed.test.js file for your testing. Keep the data in that database as minimal as possible
3. Write tests for each of your API endpoints

### Postgresql commands

USE database_name;
```
\c database_name
```
SHOW TABLES;
```
\dt
```
SHOW DATABASES;
```
\l
```
EXIT CONSOLE;
```
\q
```

### Schema breakdown

##### Areas Schema

```
     area_id       |    name     |
-------------------+-------------+
SERIAL PRIMARY KEY |   VARCHAR   |
```

Areas `have many` Restaurants

##### Restaurants Schema

```
   restaurant_id   |    name     |                  area_id                   |    cuisine     |  website  |
-------------------+-------------+--------------------------------------------+----------------+-----------+
SERIAL PRIMARY KEY |   VARCHAR   | FOREIGN KEY (area_id) REFERENCES Areas(id) |    VARCHAR     |  VARCHAR  |
```

Restaurants `have many` Comments

##### Comments Schema

```
    comment_id     |                     restaurant_id                      |      body     |            created_at               |
-------------------+--------------------------------------------------------+---------------+-------------------------------------+
SERIAL PRIMARY KEY | FOREIGN KEY (restaurant_id) REFERENCES Restaurants(id) |    VARCHAR    |  NOT NULL DEFAULT CURRENT_TIMESTAMP |
```

Restaurants also `have many` Ratings

##### Ratings Schema

The rating must be an integer with a minimum value of one and a maximum value of five. Research how to make this a constraint in your schema

```
     rating_id     |                     restaurant_id                      |    rating     |            created_at               |
-------------------+--------------------------------------------------------+---------------+-------------------------------------+
SERIAL PRIMARY KEY | FOREIGN KEY (restaurant_id) REFERENCES Restaurants(id) |    INTEGER    |  NOT NULL DEFAULT CURRENT_TIMESTAMP |
```

Ratings and Comments both belong to restaurants but have no relationship with each other. A Comment or Rating also does not need to know which Area the Restaurant it `belongs to` is in.

### API Breakdown

#### Our API will need the following routes:

1 - Get areas
returns a json object of areas keyed by their id
```
GET /api/areas
{
    1: {
        id: 1,
        name: 'Altringham'
    },
    2: {
        id: 2,
        name: 'Northern Quarter'
    }
}
```

2 - Get restaurants for a area
returns a json object of restaurants keyed by their area id
```
GET /api/areas/:area_id/restaurants
{
    area_id: 3,
    name: 'Picadilly',
    restaurants: {
        12: {
            id: 12,
            area_id: 3,
            name: 'Carluccio’s',
            cuisine: 'Italian',
            website: 'http://www.carluccios.com/'
        },
        21: {
            id: 21,
            area_id: 3,
            name: 'Yo! Sushi',
            cuisine: 'Sushi',
            website: 'https://yosushi.com/restaurants/Manchester-Piccadilly-station'
        },
    }
}
```

3 - Add a restaurant to an area
```
POST /api/areas/:area_id/restaurants
```

4 - Get comments for a restaurant
returns a json object of comments keyed by their id
```
GET /api/restaurants/12/comments
{
    id: 12,
    area_id: 3,
    name: 'Carluccio’s',
    cuisine: 'Italian',
    website: 'http://www.carluccios.com/'
    comments: {
        312: {
            id: 312,
            restaurant_id: 12,
            body: 'My partner found this place on twitter so we decided to go have a look...',
            created_at: 961027220321
        },
        422: {
            id: 312,
            restaurant_id: 12,
            body: 'The place is quirky and affordable - I paid less than 5 pounds for a...',
            created_at: 964224128725
        },
    }
}
```

5 - Get ratings for a restaurant
returns a json object of ratings keyed by their id
```
GET /api/restaurants/12/ratings
{
    id: 12,
    area_id: 3,
    name: 'Carluccio’s',
    cuisine: 'Italian',
    website: 'http://www.carluccios.com/'
    ratings: {
        32: {
            id: 32,
            restaurant_id: 12,
            rating: 7,
            created_at: 961977633210
        },
        47: {
            id: 47,
            restaurant_id: 12,
            rating: 6,
            created_at: 963964815076
        },
    }
}
```

6 - Add a comment to a restaurant
```
POST /api/restaurants/12/comments
```

7 - Add a rating to a restaurant
```
POST /api/restaurants/12/ratings
```

### Extra credit tasks

1. Extend your restaurants controller to serve a average rating and a comments count.
2. Add a query to sort your restaurants response by rating, most recently rated, most commented or most recently commented.
3. Write a route and controller for getting the average ratings across an area.

```
GET /api/areas/:area_id/average-rating
```

4. Extend your areas route and controller to list the areas by the highest to lowest average rating.
```
GET /api/areas?sort-by=average-rating
```
