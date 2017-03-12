var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var DriverSchema = new Schema({
	name : String,
	user : {type : String, unique : true, trim : true},
	password : String,
	email : String,
	phone : String, 
	creationDate : {type : Date, default : Date.now},
	vacant : {type : Boolean, index : true, default : true}
});

mongoose.model('Drivers', DriverSchema);