//archivo controlador
var drivers = require('../../app/controllers/drivers.server.controller');

//metodos REST
module.exports = function(app) {

//get y post
app.route('/drivers').post(drivers.create).get(drivers.list);
//get one. 
app.route('/drivers/:driverId').get(drivers.read);

//midleware 
app.param('driverId', drivers.driverByID);
};



