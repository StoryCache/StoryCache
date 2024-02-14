const cookieController = {}

// const pool = require("../models/dbModel")

/**
 * setCookie - set a cookie with a random number
 */
// cookieController.setCookie = (req, res, next) => {
//   // write code here
//   res.cookie("codesmith", "hi")
//   const randomNum = Math.floor(Math.random() * 100)
//   res.cookie("secret", `${randomNum}`)
//   return next()
// }

/**
 * setSSIDCookie - store the user id in a cookie
 */
cookieController.setSSIDCookie = (req, res, next) => {
  // write code here
  // console.log("entering setSSIDCookie middleware")
  // const { email } = req.body
  if (!res.locals.id) {
    return next({
      log: "Error in setSSIDCookie middleware",
      status: 500,
      message: { err: "Error in setSSIDCookie middleware" },
    })
  }
  res.cookie("ssid", res.locals.id, { httpOnly: true, sameSite: 'None', secure: true }) //is this httpOnly key needed?
  // console.log("ssid cookie set to ", res.locals.id)
  return next()
}

module.exports = cookieController
