//archivo controlador
var router = require("express").Router();
var drivers = require('../../app/controllers/drivers.server.controller');

//metodos REST
module.exports = function(app) {

//Crear un nuevo conductor
router.post('/drivers', drivers.create, drivers.read);

//get one. 
router.get('/drivers/:driverId', drivers.driverByID, drivers.read);

//
app.use('/', router);
};



