// this is our route file

const usercontroller = require('./../controllers/UserController')

module.exports = (router) => {
	/**

	* get a user

	**/
	router
		.route('/user/:id') //it means localhost:5000/user/id goes to usercontroller  getUser function
		.get(usercontroller.getUser)

	/**

	* adds a user

	**/
	router
		.route('/user') //it means localhost:5000/user goes to usercontroller  addUser function
		.post(usercontroller.addUser)


	/**

	* get all a user

	**/
	router
		.route('/users') //it means localhost:5000/users goes to usercontroller  getAllUsers function
		.get(usercontroller.getAllUsers)
}