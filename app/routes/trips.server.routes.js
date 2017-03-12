
//archivo controlador
var router = require('express').Router();

var trips = require('../../app/controllers/trips.server.controller');
var clients = require('../../app/controllers/clients.server.controller');

//metodos REST
module.exports = function(app) {

//app.param('tripId', trips.tripById);
//get y post
router.post('/trips/:clientId', trips.create);
router.get('/trips/:clientId', trips.list);
router.post('/trips/cash/:clientId', trips.tripById, trips.cash);
//

//app.route('/trips/:clientId').post(trips.create).get(trips.list);
//ruta para cobrar un viaje.
//app.route('/trips/cashtrip/:tripId').post(trips.cash);

//midlewares
//app.param('clientId', trips.clientByID);

//app.param('tripId', trips.clientByID);
//comitt

app.use('/', router);
};




