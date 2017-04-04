const bluebird = require('bluebird');
const pgp = require('pg-promise')({promiseLib: bluebird});
const dbCredentials = require('../db_config.js');
const db = pgp(dbCredentials);

function selectAllAreas (req, res) {
  db.query('SELECT * FROM areas')
    .then(rows => {
      res.status(200).json({areas: rows});
    })
    .catch(err => {
      console.log(err);
    });
}

module.exports = {
  selectAllAreas
};