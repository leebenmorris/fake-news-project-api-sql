const router = require('express').Router();
// restaurant controller?

router.get('/', function (request, response) {
    response.status(200).send({
        status: 'ok'
    });
});

module.exports = router;