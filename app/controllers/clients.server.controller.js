var Clients = require('mongoose').model('Clients');

//Crear un nuevo Cliente
exports.create = function(req, res, next) {

	req.body.creationDate = new Date();//por ahora
	var clients = new Clients(req.body);
	
		clients.save(function(err) {
			if (err) {
			return next(err);
			}	
			else {
			res.json(clients);
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
	console.log("Mostrando cliente por id");	
	res.json(req.client);
};

//buscar un cliente, y guardarlo en una variable
exports.clientByID = function(req, res, next, id) {
	console.log("clientByID");
	Clients.findOne({
	_id: id
	},
	function(err, client) {
		if (err) {
			return next(err);
		}
		else {
			if(!client) {res.json({error : true, message:"El cliente no existe"});}
			req.client = client;
			next();
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


//fin Eliminar sitio

