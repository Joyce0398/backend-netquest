var express = require('express');
var router = express.Router();

const WeatherDataController = require("../controllers/weatherData");
// router.get('/', function(req, res, next) {
//     res.send('Weather data is working properly');
// });

router.get('/', WeatherDataController.weatherData_get_all);

module.exports = router;

