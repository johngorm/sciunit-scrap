const path = require('path');

module.exports = function(app){

	app.get('/user/login', function(req, res){
		res.sendFile('login.html', {root: path.join(__dirname, '../public')})
	});

	app.get('/user/signup', function(req, res){
		res.sendFile('signup.html', {root: path.join(__dirname, '../public')});
	});

}