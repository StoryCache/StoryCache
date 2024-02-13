const userController = {}

const SALT_WORK_FACTOR = 10
const bcrypt = require("bcryptjs")
const pool = require("../models/dbModel")

/**
 * createUser - create and save a new User into the database.
 */
userController.createUser = async (req, res, next) => {
  console.log("entering createUser middleware")
  const { email, password } = req.body
  try {
    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(password, salt)
    const queryText = `INSERT INTO users (email, password) VALUES ($1, $2) RETURNING _id; `
    const result = await pool.query(queryText, [email, hashedPassword])
    res.locals.id = result.rows[0]._id
    console.log(res.locals.id);
    return next()
  } catch (error) {
    return next({
      log: `Error happened at middleware userController.createUser ${error}`,
      message: { error: "database user profile creation error" },
    })
  }
}

/**
 * verifyUser - Obtain username and password from the request body, locate
 * the appropriate user in the database, and then authenticate the submitted password
 * against the password stored in the database.
 */
userController.verifyUser = async (req, res, next) => {
  //async (req, res, next) => {
  // write code here
  // console.log('trying to verify user');
  const { username, password } = req.body
  console.log(username, password)
  if (username && password) res.locals.loginSuccess = true
  // const verifyUser = await User.find({username, password});
  // User.findOne({username, password}, (err, user) => {
  //   if (err || !user) {
  //     return next({
  //       log: 'Express error handler caught verifyUser error: Username/Password not recognized',
  //       status: 401,
  //       message: { err: 'Username/Password not recognized'}});
  //   } else {
  //     res.locals.loginSuccess = true;
  //     return next();
  //   }
  return next()
  // });
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
}

module.exports = userController
