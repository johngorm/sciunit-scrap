`use strict`;
const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcrypt');

const User = require('../models/user.js');

module.exports = function(passport){

	//Passport session signup

	//serialize the user for the session
	passport.serializeUser(function(user, done){
		done(null, user.id);
	});

	passport.deserializeUser(function(id, done){
		User.findByID(id).then( (err,user) =>{
			done(err, user);
		})
	})

	//LOCAL SIGNUP
	//=========================================

	passport.use('local-signup', new LocalStrategy({
		usernameField: 'username',
		passwordField: 'password',
		passReqToCallback : true
	},
	function(req,username, password, done){

		process.nextTick(function() {
			User.findOne({where: {username: username}}).then(function(user) {
				if(user){
					return done(null, false, req.flash('signupMessage', 'Username is already taken.'));
				}
				else{
					let hash_pass = bcrypt.hashSync(password, bcrypt.genSaltSync(8));
					User.create({
						where: {
							username: username,
							password: hash_pass
						}
					}).then( function(savedUser){
						if(!newUser){
							return done(null, false);
						}
						else{
							return done(null, savedUser);
						}
					}).catch( function(err){
						throw err;
					})
				}
			}).catch( function(err){
				console.error(err);
				throw err;
			});
		});
	}));;


	//LOCAL LOGIN
	//=========================================

	passport.use('local-login', new LocalStrategy({
		usernameField: 'username',
		passwordField: 'password',
		passReqToCallback: true
	},
	function(req, username, password, done){
		//Function compares passwords and returns in they match or not
		function isValidPassword(userpass, password){
			return bcrypt.compareSync(password, userpass);
		};
		//Find a user whose  usernames is the same as the forms username
		User.findOne({where: {username: username}}).then(function(user){
			//User not found
			if(!user){
				return done(null, false, {message: 'User does not exist'})
			}
			//Invalid password
			if(!isValidPassword(user.password, password)){
				return done(null, false, {message: 'Incorrect Password'});
			}
			//Return user info to authenticate them
			let userinfo = user.get();
			return done(null, userinfo);


		}).catch(function(err){
			console.error(err);
			throw err;
		})
	}
	));
}