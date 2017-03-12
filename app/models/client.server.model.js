var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var ClientsSchema = new Schema({
	name : String,
	user: {type : String, trim : true, unique : true},
	password : String,
	email : String,
	balance : Number, 
	creationDate : Date
});

mongoose.model('Clients', ClientsSchema);
