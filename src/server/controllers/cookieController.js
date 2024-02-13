const cookieController = {};

const User = require('../models/userModel');

/**
* setCookie - set a cookie with a random number
*/
cookieController.setCookie = (req, res, next) => {
  // write code here
  res.cookie('codesmith', 'hi');
  const randomNum = Math.floor(Math.random() * 100);
  res.cookie('secret', `${randomNum}`);
  return next();
}

/**
* setSSIDCookie - store the user id in a cookie
*/

// const user = await User.findOne({ username },);
//   console.log('user:', user._id.toHexString());

cookieController.setSSIDCookie = (req, res, next) => {
  // write code here
  console.log('entering setSSIDCookie middleware');
  const { username } = req.body;
  User.findOne({username}, '_id', (err, user) => {
    if (err) return next('Error in : cookieController.setSSIDCookie' + JSON.stringify(err));
    const ssid = user._id.toHexString();
    res.locals.ssid = ssid;
    res.cookie('ssid', ssid, {httpOnly: true});
    console.log('ssid cookie set to ', ssid);
    return next();
  });
}

module.exports = cookieController;
