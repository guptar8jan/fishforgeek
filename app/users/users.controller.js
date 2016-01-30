"use strict"
import db2 from '../library/db';
import _ from "lodash";

module.exports = {
    getUsers: getUsers,
    createUser: createUser,
    updateUser: updateUser,
    patchUser: patchUser
};

function getUsers(req, res){
	console.log(db2.users.attributes);
	if(req.params.id) {
		db2.users
			.findById(req.params.id)
			.then(function (user) {
				res.status(200).send(user);
			})
			.catch(function(error){
				res.status(500).send(error);
			});
	} else {
		db2.users
			.findAll()
			.then(function (allUsers) {
				res.status(200).send(allUsers);
			})
			.catch(function(error){
				res.status(500).send(error);
			});
	} 
}

function updateUser(req, res){
	var user = req.body;
	user = _.omit(user, ['id', 'createdAt', 'updatedAt']);
	if(!validateUser(res, user)){
		return;
	}
	var id = req.params.id;
	
	db2.users.update(user,
		  {
		    where: { id : id }
		  })
	.then(function(updated) {
		console.log("updated", updated);
		if(updated == 1){
	    	db2.users.findById(id)
			.then(function(updatedUser) {
	    	res.status(200).send(updatedUser)});
		} else {
			res.status(400).send("id not found, nothing to update");
		}
	})
	.catch(db2.Sequelize.ValidationError, function(validationErrors){
		res.status(400).send(validationErrors.errors);
	})
	.catch(function(error){
		res.status(500).send(error);
	});
}

function patchUser(req, res){
	var id = req.params.id;
	var user = req.body;
	user = _.omit(user, ['id', 'createdAt', 'updatedAt']);
	db2.users.update(user,
		  {
		    where: { id : id }
		  })
	.then(function(updated) {
		if(updated == 1){
			db2.users.findById(id)
			.then(function(updatedUser) {
	    	res.status(200).send(updatedUser)})
	    	.catch(function(error){
	    		res.status(500).send(error);
	    	});
		} else {
			res.status(400).send("id not found, nothing to update");
		}
	  })
	.catch(db2.Sequelize.ValidationError, function(validationErrors){
		res.status(400).send(validationErrors.errors);
	})
	.catch(function(error){
		res.status(500).send(error);
	});
}

function createUser(req, res){
	var user = req.body;
	user = _.omit(user, ['id', 'createdAt', 'updatedAt']);
	db2.users.create(user)
	.then(function(created) {
	    res.status(201).send(created);
	  })
	.catch(db2.Sequelize.ValidationError, function(validationErrors){
		res.status(400).send(validationErrors.errors);
	})
	.catch(function(error){
		console.log(error);
		res.status(500).send(error);
	});
}

function validateUser(res, user){
	if(!user.firstName ||
		!user.lastName ||
		!user.email ||
		!user.authId ||
		!user.authProvider)
	{
		res.status(400).send("invalid data for user. first name, last name, authId, authProvider and email is required.")
		return false;
	}
	return true;
}