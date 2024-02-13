const express = require("express")
const authRouter = express.Router()
const userController = require('../controllers/userController');
// const cookieController = require('../controllers/cookieController');

authRouter.post(
  "/signup",
  userController.createUser,
//   cookieController.setSSIDCookie,
  (req, res) => {
    // what should happen here on successful sign up?
    // console.log("successful user creation. redirecting to secret")
    // res.redirect("/secret") //path.resolve(__dirname, '../client
    res.status(200).json({ message: "signing up" })
  },
)

/**
 * login
 */
authRouter.post(
  "/login",
  userController.verifyUser,
//   cookieController.setSSIDCookie,
  (req, res) => {
    // what should happen here on successful log in?
    // console.log('response object.cookie:', res.cookie.ssid);
    if (!res.locals.loginSuccess) {
      console.log("login unsuccessful!")
    //   res.redirect("/signup")
      res.status(200).json({ message: "login unsuccessful" })
    } else {
      console.log("login successful!")
    //   res.redirect("/home")
    res.status(200).json({ message: "login successful, redirect to /home" })
    }
  },
)

module.exports = authRouter
