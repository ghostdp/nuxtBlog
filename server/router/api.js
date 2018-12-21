var express = require('express');
var UserModel = require('../model/users.js');
var router = express.Router();

router.get('/register', function(req, res, next) {
	let username = req.query.username;
	let password = req.query.password;
	let password2 = req.query.password2;
	//console.log( username , password , password2 );
	
	UserModel.findOne({ username }).then((info)=>{
		if(info){    //用户已存在
			res.send({ code : -1 });
		}
		else{   //用户不存在
			UserModel({
				username,
				password,
			}).save().then((info)=>{
				res.send({ code : 0 });
			});
		}
	});

});

router.get('/login', function(req,res,next){
	let username = req.query.username;
	let password = req.query.password;

	UserModel.findOne({
		username,
		password,
	}).then((info)=>{
		if(info){
			var token = parseInt(Math.random() * 99999);
			
			delete req.session.token;
			delete req.session.username;

			req.session.token = token;
			req.session.username = username;
			
			res.send({ code : 0 , token , username });
		}
		else{
			res.send({ code : -1 });
		}
	});

});

router.get('/isLogin' , function(req,res,next){
	var token = req.query.token;
	console.log( token , req.session.token );
	if( token && token == req.session.token ){
		res.send({ code : 0 , username : req.session.username });
	}
	else{
		res.send({ code : -1 });
	}
});

router.get('/logout',function(req,res,next){
	req.session.destroy();
	res.send({ code : 0 });
});

module.exports = router;