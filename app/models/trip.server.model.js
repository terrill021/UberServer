var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var TripSchema = new Schema({
	latitudestart : String, //latitud punto de inicio 
	longitudestart : String, //longitud punto de inicio
	latitudeend : String,
	longitudeend : String,
	client : {type : Schema.Types.ObjectId, ref:'Clients'},
	driver : {type : Schema.Types.ObjectId, ref:'Drivers'},
	tripDate : {type : Date, default : Date.now},
	creationDate : {type : Date, default : Date.now},	
	value : Number
});
mongoose.model('Trips', TripSchema);