var express = require('express');
var router = express.Router();
var fs = require("fs");
var db = require("../db.js");

/* GET users listing. */
router.get('/', function(req, res, next) {
  db.User.findAll().then(function(users) {
	  console.log( users );
	  res.end( JSON.stringify(users));
	})
});

router.get('/add', function (req, res) {
	var user = {
   "user4" : {
      "name" : "mohit",
      "password" : "password4",
      "profession" : "teacher",
      "id": 4
	   }
	};
   // First read existing users.
   fs.readFile( __dirname + "/" + "users.json", 'utf8', function (err, data) {
       data = JSON.parse( data );
       data["user4"] = user["user4"];
       console.log( data );
       res.end( JSON.stringify(data));
   });
});

router.get('/:id', function (req, res) {
   db.User.findById(req.params.id).then(function(user) {
	  console.log( user );
	  res.end( JSON.stringify(user));
	})
});

router.get('/delete/:id', function (req, res) {
  	db.User.findById(req.params.id).then(function(user) {
  		if(user != null) {
		  	user.destroy().then(function(u) {
			    res.end( JSON.stringify("user deleted" ));
			})
		}
		else{
			res.end( JSON.stringify("user not found" ));
		}
	})
});

module.exports = router;
