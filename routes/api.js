const router = require('express').Router();
const controller = require('../controllers/controllers');
const bodyParser = require('body-parser');

router.get('/', function (request, response) {
  response.status(200).send({
    status: 'OK'
  });
});

module.exports = router;