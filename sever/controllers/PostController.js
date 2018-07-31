const Post = require('./../models/Post')

module.exports = {

	addPost : (req,res,next)=>{
		const savepost = req.body;
		const post = new Post(savepost); 
		if (!savepost._id) {
			post.save((err,newPost)=>{
				if(err)
					res.send(err)
				else if(!newPost)
					res.send(400)
				else
					res.send(newPost)
				next()
			})
		}else{
			Post.findById(savepost._id,(err,post)=>{
				if(err) handleError(err);
				post.set(savepost);
				post.save((err,updatePost)=>{
					if(err)
						res.send(err)
					else if(!updatePost)
						res.send(400)
					else
						res.send(updatePost)
					next()
				})

			})

		}
	},
	getPost : (req,res,next)=>{
		const post_id = req.params.id;
		Post.findById(post_id)//we need to get user object
		.populate('author') //can be done by using this
		.exec((err,post)=>{ 
			if(err)
				res.send(err)
			else if(!post)
				res.send(400)
			else
				res.send(post)
			next()
		})

	},
	getAllPost : (req,res,next)=>{
		Post.find().populate('author').exec((err,posts)=>{
			if(err)
				res.send(err)
			else if(!posts)
				res.send(400)
			else
				res.send(posts)
			next()
		})
	}
}