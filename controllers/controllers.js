const bluebird = require('bluebird');
const pgp = require('pg-promise')({ promiseLib: bluebird });
const dbCredentials = require('../db_config.js');
const db = pgp(dbCredentials);
const async = require('async');

module.exports = {
  
};