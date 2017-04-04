const bluebird = require('bluebird');
const pgp = require('pg-promise')({promiseLib: bluebird});
const dbCredentials = require('../db_config.js');
const db = pgp(dbCredentials);

const allAreas = 'SELECT * FROM areas';

const restaurantsById = id =>
  `SELECT * FROM restaurants
   WHERE area_id = ${id}`;



function selectAllAreas (req, res) {
  db.query(allAreas)
    .then(rows => {
      res.status(200).json({areas: rows});
    })
    .catch(err => {
      console.log(err);
    });
}

function selectRestaurantsById (req, res) {
  db.query(restaurantsById(req.params.area_id))
    .then(rows => {
      rows = rows.reduce((acc, row) => {acc[row.id] = row; return acc;}, {});
      res.status(200).json({restaurants: rows});
      })
    .catch(err => {
      console.log(err);
    });
}

module.exports = {
  selectAllAreas,
  selectRestaurantsById
};