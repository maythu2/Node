
// lets import user model 
const User = require('./../models/User')
const bcrypt = require('bcryptjs');

module.exports = { // this is exporting of our file to use in every where
	addUser : (req,res,next) => { //this is a kind of es6 function which is suitable for boring many codes
		//req is request parameter,res is response parameter,next is always need after done response
		console.log(req.body); //this is print our save data array come from api
		if(req.body.password){
			var hashedPassword = bcrypt.hashSync(req.body.password, 8);	
			req.body.password = hashedPassword;					
		}
		const saveuser = req.body;

		const user = new User(saveuser);
		if (!saveuser._id) {
			user.save((err,newUser)=>{ //new user is returning user,newly created
				if(err)
					res.send(err)
				else if(!newUser)
					res.send(400)
				else
					newUser.password = undefined;  // password should not show
					res.send(newUser)
				next()
			});
		}else{
			User.findById(saveuser._id,(err,user)=>{

				if(err) return handleError(err);

				user.set(saveuser);

				user.save((err,updateUser)=>{
					if(err)
					res.send(err)
					else if(!updateUser)
						res.send(400)
					else
						updateUser.password = undefined;  // password should not show
						res.send(updateUser)
					next()
				})
			})
		}
	},
	getUser : (req,res,next) => {
		// console.log(req.params.id); //this is print our id parameter
		const userid = req.params.id;

		User.findById(userid, { password: 0 }).then((err,user)=>{ //user is return user find result user
			if(err)
				res.send(err)
			else if(!user)
				res.send(400)
			else
				res.send(user)
			next()
		});

	},
	getAllUsers : (req,res,next) => {
		console.log('getAllUsers'); 
		User.find({}, { password: 0 }).then((err,users)=>{ //user is return user find result user
			if(err)
				res.send(err)
			else if(!users)
				res.send(400)
			else
				res.send(users)
			next()
		});
		
	}

}