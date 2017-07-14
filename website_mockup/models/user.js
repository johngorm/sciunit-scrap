'use strict';
module.exports = function(sequelize, DataTypes) {
  var User = sequelize.define('User', {
    username: {
    	type:DataTypes.STRING,
    	required: true,
    	unique: true,
    	validate:{
    		isAlphanumeric: true
    	}
    },
    password:{
		type:  DataTypes.STRING,
		required: true,
		validate:{
			isAlphanumeric: true,
			len: [6,Infinity]
		}
	}
  }, {
    classMethods: {
    	associate: function(models) {
        // associations can be defined here
      }
    }
  });
  return User;
};