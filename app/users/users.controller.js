"use strict"
import User from '../library/db'

module.exports = {
    getUsers: getUsers,
    createUser: createUser
};

function getUsers(req, res){
    res.status(200).send([{
        email: 'test@test.com',
        firstName: 'Rekha',
        lastName: 'Gupta',
        authProvider: 'facebook',
        authId: '123452334'
    }]);
}

function createUser(req, res){
	var user = req.body;
	console.log(User);
	User.create(user)
	.then(function(anotherTask) {
	    res.status(201).send(user);
	  })
	.catch(function(error){
		console.log(error);
	});
}
