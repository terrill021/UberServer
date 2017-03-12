var Drivers = require('mongoose').model('Drivers');

//Crear un nuevo Cliente
exports.create = function(req, res, next) {	
	console.log(req.body);
	var drivers = new Drivers(req.body);
	
		drivers.save(function(err) {
			if (err) {
			return next(err);
			}	
			else {
			res.json(drivers);
			}
		}); 
};
//fin de creacion de un nuevo cliente

//listar todos los conductores
exports.list = function(req, res, next) {
	Drivers.find({}, function(err, drivers) {
		if (err) {
		return next(err);
		}
		else {
		res.json(drivers);
		}
	});
};
//fin listar todos los sitios

//Mostrar clientes
exports.read = function(req, res) {
	console.log("Mostrando cliente por id");	
	res.json(req.driver);
};

//buscar un cliente, y guardarlo en una variable
exports.driverByID = function(req, res, next, id) {
	console.log("Obteniedo cliente por id");
	Drivers.findOne({
	_id: id
	},
	function(err, driver) {
		if (err) {
			return next(err);
		}
		else {
			if(!driver) {res.json({error : true, message:"El cliente no existe"});}
			req.driver = driver;
			next();
		}
	}
	);
};
//fin buscar un
