const express = require("express")
const mongoose = require("mongoose")
const cors = require("cors")
const bodyParser = require("body-parser")
//these are require packages that we need

//add routes
const routes = require('./routes/')

const app = express() //this is initilization of express app
const router =express.Router() //this is create router

router.use(bodyParser.urlencoded({ extended: false })); // for json return
router.use(bodyParser.json());  // for json return 

const url=process.env.MONGODB_URI || "mongodb://localhost:27017/mernstack" //this is a kind of mongodb


/*** connect to mongo db database ***/
try{
	mongoose.connect(url, {
		//usemongoClient: true
	})
}catch (error) {
	console.log(error)
}
let port= 5000 || process.env.PORT //this is our sever port,now can run as localhost:5000

//use route
routes(router)

app.use(cors()) //this is let our app can use from every domain,
app.use(bodyParser.json())

app.use('/api',router) //this is declare of route by premix api ...


// start sever
app.listen(port, () =>{ //this is run app
	console.log(`sever started at port: ${port}`);
})