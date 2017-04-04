const router = require('express').Router();
const controller = require('../controllers/controllers');
const bodyParser = require('body-parser');

router.get('/', function (request, response) {
    response.status(200).send({
        status: 'OK'
    });
});


router.get('/areas', controller.selectAllAreas);

router.get('/areas/:area_id/restaurants',controller.selectRestaurantsByAreaId);



router.post('/areas/:area_id/restaurants', controller.postRestaurantByAreaId);

module.exports = router;