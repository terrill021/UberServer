var Clients = require('mongoose').model('Clients');

//Crear un nuevo Cliente
exports.create = function(req, res, next) {

	req.body.creationDate = new Date();//por ahora
	var clients = new Clients(req.body);
	
		clients.save(function(err, client) {
			if (err) {
			return next(err);
			}	
			else {
			res.json(client);
			}
		}); 
};
//fin de creacion de un nuevo cliente

//listar todos los clientes
exports.list = function(req, res, next) {
	Clients.find({}, function(err, clients) {
		if (err) {
		return next(err);
		}
		else {
		res.json(clients);
		}
	});
};
//fin listar todos los sitios

//Mostrar clientes
exports.read = function(req, res) {
	console.log("read");	
	res.json(req.client);
};

//buscar un cliente, y guardarlo en una variable
exports.clientByID = function(req, res, next) {
	console.log("clientByID");
	
	Clients.findOne({
	_id: req.params.clientId || req.trip.client
	},
	function(err, client) {
		if (err) {
			return next(err);
		}
		else {
			if(client == null) {
				res.json({error : true, message:"the client does not exist"});
			}
			else{
			req.client = client;
			console.log("Cliente encontrado " + client._id);
			next();
			}
		}
	}
	);
};
//fin buscar un stio

//Buscar un cliente y actualizarle el saldo
exports.setBalance = function(req, res, next) {
	console.log("Actualizando saldo a cliente");
	req.client.balance = req.body.balance;
	req.client.save(function(err) {
			if (err) {
			return next(err);
			}	
			else {
			res.json(req.client);
			}
		});
};
//fin buscar y actualizar

//iniciar sesion cliente
exports.session = function(req, res, next) {
	console.log(req.body)
	Clients.findOne({user : req.body.user, password : req.body.password}, function(err, client){
		if (err) {res.json({error : true, message : "Error interno"})};
		req.client = client;
		//res.json({error : false, message:"process ended ok", user: client});
		next();
	})
};
//fin Eliminar sitio

exports.saveToken = function (req, res, next){
	req.client.pushToken = req.body.pushToken;
	req.client.save(function(err, client){
		if (err) {res.json({error : true, message : "There was an mistake saving the push token", description: err})};
		res.json({error :false, message: "Session started correctly", user: client});
	})
}
