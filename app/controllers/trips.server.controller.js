var Trips = require('mongoose').model('Trips');
var Drivers = require('mongoose').model('Drivers');
var Clients = require('mongoose').model('Clients');

//
var DRIVERID;


//Crear un nuevo viaje
exports.create = function(req, res, next) {	
	//recupero id del midleware
	req.body.client = req.client._id;
	//Construyo el objeto viaje con los parametros de body
	var trip = new Trips(req.body);
	//Asignarle el conductor al viaje
	//Buscar un conductor disponible
	Drivers.findOne({vacant : true}, function(err, driver){
		if(err){
			return next(err);
		}else{
			// Si no hay conductores disponibles
			if(! driver){				
				res.json({error: true, message:"No hay conductores disponibles"});
			}
			//Guardo conductor en var global
			DRIVERID = driver._id; 
			//console.log(req.body);
		}
	}); 
	//Agregar coductor al cuerpo de la petición
	trip.driver = DRIVERID;
	console.log(trip);	
	//console.log(trip);	
	// Guardo el viaje en DB
		trip.save(function(err, tripSaved) { 
			if (err) {
			return next(err);
			}	
			else {
				//Bloquear al conductor como ocupado
				//
				//Notifificar al conductor el viaje
				//
				//Responder a la petición 
				res.json(tripSaved);
				// --fin
			}
		}); 
};
//fin de creacion de un nuevo cliente

//listar todos los viajes de un cliente
exports.list = function(req, res, next) {
	Trips.find({client : req.body.client}, function(err, trips) {
		if (err) {
		return next(err);
		} 
		else {
		res.json(trips);
		}
	});
};
//fin listar todos los sitios

//Mostrar clientes
exports.read = function(req, res) {	
	res.json(req.trip);
};

//buscar un cliente, y guardarlo en una variable
/*
exports.clientByID = function(req, res, next, id) {
	console.log('clientByID');	

	Clients.findOne({
	_id: id
	},
	function(err, client) {
		if (err) {
			return next(err);
		}
		else {
			if(!client) {res.json({error : true, message:"El cliente no existe"});}
			req.body.client = client;
			next();
		}
	}
	);
};
*/
//fin buscar un stio

//cobrar un viaje
exports.cash = function (req, res, next){
	//Calcular valor viaje
	console.log("cash");
	res.json("fin");
	/*
	Clients.findOne({
	_id: req.body.client
	},
	function(err, client) {
		if (err) {
			return next(err);
		}
		else {
			if(!client) {res.json({error : true, message:"El cliente no existe"});}
			
			req.body.client = client._id;
			next();
		}
	}
	);
	*/
}
//
exports.hello = function(req, res, next){
	console.log("Hello word!!");

}
//buscar un cliente, y guardarlo en una variable
exports.tripById = function(req, res, next) {
	console.log('tripById');
	next();
	/*	
	Trips.findOne({
	_id: id
	},
	function(err, trip) {
		if (err) {
			return next(err);
		}
		else {
			if(!trip) {res.json({error : true, message:"El viaje no esta registrado"});}
			req.body.trip = trip._id;
			next();
		}
	}
	);*/
};
//fin buscar un stio