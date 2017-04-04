const router = require('express').Router();
const controller = require('../controllers/controllers');
// restaurant controller?

router.get('/', function (request, response) {
    response.status(200).send({
        status: 'OK'
    });
});

router.get('/areas', controller.selectAllAreas);

module.exports = router;