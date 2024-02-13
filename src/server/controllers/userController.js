const User = require('../models/userModel');

const userController = {};

/**
* getAllUsers - retrieve all users from the database and stores it into res.locals
* before moving on to next middleware.
*/
userController.getAllUsers = (req, res, next) => {
  User.find({}, (err, users) => {
    // if a database error occurs, call next with the error message passed in
    // for the express global error handler to catch
    if (err) return next('Error in userController.getAllUsers: ' + JSON.stringify(err));
    
    // store retrieved users into res.locals and move on to next middleware
    res.locals.users = users;
    return next();
  });
};

/**
* createUser - create and save a new User into the database.
*/
userController.createUser = (req, res, next) => { //async (req, res, next) => {
  // write code here
  console.log('entering createUser middleware');
  const { username, password } = req.body;
  User.create({username, password}, (err) => {
    if (err) return next('Error in userController.createUsers: ' + JSON.stringify(err));
    console.log('new username:', username)
    return next();
  })
  // .then(() => next())
  // .catch((err) => next(
  //   {
  //     log: 'Express error handler caught createUser error',
  //     status: 500,
  //     message: { err: `${err} A createUser error occurred`}
  //   }
  // ));
};

/**
* verifyUser - Obtain username and password from the request body, locate
* the appropriate user in the database, and then authenticate the submitted password
* against the password stored in the database.
*/
userController.verifyUser = async (req, res, next) => { //async (req, res, next) => {
  // write code here
  // console.log('trying to verify user');
  const { username, password } = req.body;
  res.locals.loginSuccess = false;
  // const verifyUser = await User.find({username, password}); 
  User.findOne({username, password}, (err, user) => {
    if (err || !user) {
      return next({
        log: 'Express error handler caught verifyUser error: Username/Password not recognized',
        status: 401,
        message: { err: 'Username/Password not recognized'}});
    } else {
      res.locals.loginSuccess = true;
      return next();
    }
      
  });
  // console.log('verify user:', verifyUser.length);
  // if (verifyUser.length === 1) {
  //   res.locals.loginSuccess = true;
  //   // console.log('login successful!');
  //   return next();
  // } else {
  //   res.locals.loginSuccess = false;
  //   next({
  //     log: 'Express error handler caught verifyUser error: Username/Password not recognized',
  //     status: 500,
  //     message: { err: 'Username/Password not recognized'}
  //   })
  // }
};

module.exports = userController;
