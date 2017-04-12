var gcm = require('node-gcm');
var sender = new gcm.Sender('AIzaSyAUBasq6tBbW-cOmKL52HjKS_uCwzBzSb0');
var message = new gcm.Message();


exports.sendPush = function (registrationTokens, title, body) {
	// body...
	message.addNotification('title', title);
	message.addNotification('body', body);
	message.addNotification('icon', 'ic_launcher');

	sender.send(message, {registrationTokens : registrationTokens}, 10,
		function(err, response){
			if (err) {consolle.error(err)}
			else console.log(response);
	})
}