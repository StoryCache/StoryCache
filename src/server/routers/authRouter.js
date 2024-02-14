const express = require("express")
const authRouter = express.Router()
const userController = require("../controllers/userController")
const cookieController = require("../controllers/cookieController")

authRouter.post(
  "/signup",
  userController.createUser,
  cookieController.setSSIDCookie,
  (req, res) => {
    // what should happen here on successful sign up?
    // console.log("successful user creation. redirecting to secret")
    // res.redirect("/secret") //path.resolve(__dirname, '../client
    return res.status(200).json(res.locals.id);
  },
)

/**
 * login
 */
authRouter.post(
  "/login",
  userController.verifyUser,
  cookieController.setSSIDCookie,
  (req, res) => {
    console.log(res.locals.id)
    if (!res.locals.id) {
      console.log("login unsuccessful!")
      //   res.redirect("/signup")
      res.status(200).json({ message: "login unsuccessful" })
    } else {
      console.log("login successful!")
      //   res.redirect("/home")
      return res.status(200).json(res.locals.id);
    }
  },
)

module.exports = authRouter
