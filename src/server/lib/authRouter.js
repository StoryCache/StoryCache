const express = require("express")
const authRouter = express.Router()
const userController = require('../controllers/userController');
const cookieController = require('../controllers/cookieController');
const sessionController = require('../controllers/sessionController');

authRouter.get("/login", async (_req, res) => {
  res.status(200).json({ message: "Hello logging in!" })
})

/**
 * signup
 */
// authRouter.get('/signup', (req, res) => {
//     res.sendFile(path.resolve(__dirname, '../client/signup.html'));
//   });

authRouter.post(
  "/signup",
  userController.createUser,
  cookieController.setSSIDCookie,
  sessionController.startSession,
  (req, res) => {
    //cookieController.setSSIDCookie,
    // what should happen here on successful sign up?
    console.log("successful user creation. redirecting to secret")
    res.redirect("/secret") //path.resolve(__dirname, '../client
  },
)

/**
 * login
 */
authRouter.post(
  "/login",
  userController.verifyUser,
  cookieController.setSSIDCookie,
  sessionController.startSession,
  (req, res) => {
    //cookieController.setSSIDCookie,
    // what should happen here on successful log in?
    // console.log('response object.cookie:', res.cookie.ssid);
    if (!res.locals.loginSuccess) {
      console.log("login unsuccessful!")

      res.redirect("/signup")
    } else {
      console.log("login successful!")
      res.redirect("/secret")
    }
  },
)

module.exports = authRouter
