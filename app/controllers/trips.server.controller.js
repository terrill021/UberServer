var Trips = require('mongoose').model('Trips');
var Drivers = require('mongoose').model('Drivers');
var Clients = require('mongoose').model('Clients');

//Crear un nuevo viaje
exports.createTrip = function(req, res, next) {	

	console.log("createTrip");
	//recupero id del cliente
	req.body.client = req.client._id;
	//Recupero el id del consuctor
	req.body.driver = req.driver._id;
	//Creo el viaje
	var trip = new Trips(req.body);	 	
	//Guardo el viaje en mongoDB
	trip.save(function(err, tripSaved) { 
			if (err) {
			return next(err);
			}	
			else {
				console.log("El viaje se creo correctamente");
				//Almaceno la info del viaje para reportarla
				req.trip = tripSaved;
				//Llamo al siguiente midleware
				next();
			}
		}); 
};

exports.searhVacantDriver = function(req, res, next){
	//Agregar coductor al cuerpo de la petición
	
	console.log("searhVacantDriver");	
	//Buscar un consuctor disponible
	Drivers.findOne({vacant : true}, function(err, driver){
		if(err){
			return next(err);
		}else{
			// Si no hay conductores disponibles
			if(driver == null){				
				res.json({error: true, message: "Lo sentimos, no hay conductores disponibles"});
			}
			//Guardo conductor en el request
			console.log ="coductor asignado :" + driver;
			req.driver = driver;
			//console.log(req.body);
		}
	}); 
};


//Obtener viaje sin cobrar de un conductor
exports.getUncashedTrips = function(req, res, next){
	//Agregar coductor al cuerpo de la petición	
	Trips.findOne({ driver : req.params.driverId, cashed : false}, function(err, trip){
		if(err){
			return next(err);
		}else{
			// respuesta				
				res.json({trip : trip, error = false, message="OK"});			
			}
	}); 
};

//listar todos los viajes de un cliente
exports.list = function(req, res, next) {
	Trips.find({client : req.params.clientId}, function(err, trips) {
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
	res.json(req);
};

//confirmar solicitud de viaje
exports.confirmTrip = function(req, res, next) {	
	//notificar al cliente
	//Notificar al conductor

	//preparar respuesta
	req.res.trip = req.trip;
	req.res.message = "The request was procesed correctly";
	req.res.error= false;
	//Generar respuesta a la petición
	res.json(req.res);
};

//Calcular el valor de un viaje
exports.calculateTripValue = function (req, res, next){
	
	var tValue = 7000;
	var tDistance  = 3000;
	var tduration = 20;
	//Calcular valor viaje
		//...
	//Calcular distancia del viaje
		//...
	//le asigno el valor al viaje
	req.trip.value = tValue;
	//le asigno la duración del viaje
	req.trip.duration = req.body.duration;
	//le asigno la distancia al viaje
	req.trip.distance = tDistance;

	//Marcar como cobrado
	req.trip.cashed = true;
	//Almacenar info del viaje actualizada con valores
	req.trip.save(function(err){
		if(err){
			//Termino el proceso y respondo con error
			res.json({error:true, message:"Error al procesar el cobro, intente nuevamente"});
		}
		else{
			//Llamar al siguiente middleware 
			next();
		}
	});
	//llamar al siguiente midleware	
};

//cobrar un viaje
exports.cashTrip = function (req, res, next){
	
	console.log("cashTrip");
	//Descontar valor del viaje al cliente
	
	req.client.balance -= req.trip.value;

	if (req.client.balance < 0) {
		//reportar cobro al OIS
		console.log('Reportando cobro al OIS');
		/*Por definir*/
		//Si proceso de cobro al OIS termino correctamente
			//...
			//Definir el estado de la cuenta a cero
			req.client.balance = 0;
		//Si proceso de cobro al OIS NO termino correctamente	
			//..						
	}
	//Se actuliza la información del cliente
	req.client.save(function(err){
		if (err) {
			res.json({err:true, message:"La información del cliente no puede ser actualizada"})
		}
	});
	//Se llama al siguiente middleware
	next();
};

//buscar un viaje por id
exports.tripById = function(req, res, next) {
	console.log("tripById");	
	
	Trips.findOne({
	_id: req.params.tripId
	},
	function(err, trip) {
		if (err) {
			res.json({error : true, message:"El viaje no se encuentra registrado."})
		}
		else {
			if(trip == null) {
				res.json({error : true, message:"El viaje no esta registrado"});
			}
			else{
				//Almaceno el viaje en una variable
				req.trip = trip;
				//Llamo al siguiente middleware
				next();	
			}			
		}
	}
	);
};

exports.reportCashedTrip = function(req, res, next){
	//notificar al cliente 

	//notificar al conductor

	//resonder a la petición
	res.json({"cliente": req.client, "viaje": req.trip});
}
