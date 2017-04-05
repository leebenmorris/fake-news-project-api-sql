const bluebird = require('bluebird');
const pgp = require('pg-promise')({ promiseLib: bluebird });
const dbCredentials = require('../db_config.js');
const db = pgp(dbCredentials);
const async = require('async');

function selectAllAreas(req, res) {
  db.query('SELECT * FROM areas')
    .then(rows => {
      res.status(200).json({ areas: rows });
    })
    .catch(err => {
      console.log(err);
    });
}

function selectRestaurantsByAreaId(req, res) {
  db.query(`SELECT * FROM restaurants WHERE area_id = $1`, req.params.area_id)
    .then(restaurants => {
      async.map(
        restaurants,
        function (restaurant, cb) {
          db.any('SELECT COUNT(*) FROM comments WHERE restaurant_id = $1', restaurant.id)
            .then(commentsCount => {
              restaurant.comment_count = +commentsCount[0].count;
              cb(null, restaurant);
            });
        },
        function (err, docs) {
          if (err) console.log(err);
          docs = docs.reduce((acc, restaurant) => { acc[restaurant.id] = restaurant; return acc; }, {});
          res.status(200).send(docs);
        }
      );
    })
    .catch(err => {
      console.log(err);
    });
}

function postRestaurantByAreaId(req, res) {
  db.one(
    'INSERT INTO restaurants (name, area_id, cuisine, website) VALUES ($1, $2, $3, $4) returning *',
    [req.body.name, req.params.area_id, req.body.cuisine, req.body.website])
    .then(restaurant => {
      res.status(200).json({ posted: restaurant });
    })
    .catch(err => {
      console.log(err);
    });
}

function selectCommentsByRestaurantId(req, res) {
  db.one('SELECT * FROM restaurants WHERE id = $1', req.params.restaurant_id)
    .then(restaurant => {
      db.any('SELECT * FROM comments WHERE restaurant_id = $1', restaurant.id)
        .then(commentRows => {
          const comments = commentRows.reduce((acc, row) => { acc[row.id] = row; return acc; }, {});
          restaurant.comments = comments;
          res.status(200).send(restaurant);
        });
    })
    .catch(err => {
      console.log(err);
    });
}

function selectRatingsByRestaurantId(req, res) {
  db.one('SELECT * FROM restaurants WHERE id = $1', req.params.restaurant_id)
    .then(restaurant => {
      db.any('SELECT * FROM ratings WHERE restaurant_id = $1', restaurant.id)
        .then(ratingRows => {
          const ratings = ratingRows.reduce((acc, row) => { acc[row.id] = row; return acc; }, {});
          restaurant.ratings = ratings;
          res.status(200).send(restaurant);
        });
    })
    .catch(err => {
      console.log(err);
    });
}

function postCommentByRestaurantId(req, res) {
  db.one('INSERT INTO comments (restaurant_id, body) VALUES ($1, $2) returning *', [req.params.restaurant_id, req.body.comment])
    .then(comment => {
      res.status(200).json({ posted: comment });
    })
    .catch(err => {
      console.log(err);
    });
}

function postRatingByRestaurantId(req, res) {
  db.one('INSERT INTO ratings (restaurant_id, rating) VALUES ($1, $2) returning *', [req.params.restaurant_id, req.body.rating])
    .then(rating => {
      res.status(200).json({ posted: rating });
    })
    .catch(err => {
      console.log(err);
    });
}

module.exports = {
  selectAllAreas,
  selectRestaurantsByAreaId,
  postRestaurantByAreaId,
  selectCommentsByRestaurantId,
  selectRatingsByRestaurantId,
  postCommentByRestaurantId,
  postRatingByRestaurantId
};