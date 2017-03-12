//archivo controlador
var clients = require('../../app/controllers/clients.server.controller');

//metodos REST
module.exports = function(app) {

//get y post
app.route('/clients').post(clients.create).get(clients.list);

//get one. 
app.route('/clients/:clientId').get(clients.read);

//midleware que se ejecuta antes de cualquier otro
//que use el parametro 'client5Id'
app.param('clientId', clients.clientByID);

//Registar credito a cliente
app.route('/clients/setbalance/:clientId').put(clients.setBalance);
};



