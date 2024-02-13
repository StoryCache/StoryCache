const Session = require('../models/sessionModel');
const cookieParser = require('cookie-parser');
const User = require('../models/userModel');
const sessionController = {};

/**
 * isLoggedIn - find the appropriate session for this request in the database, then
 * verify whether or not the session is still valid.
 */
sessionController.isLoggedIn = async (req, res, next) => {
  // write code here
  const ssid = req.cookies.ssid;
  console.log('checking sessions for ssid of ', ssid);
  const sessionId = await Session.findOne({ cookieId: ssid }); //, (err, user) => {
  // if (err) {
  //   return next('Error in : sessionController.isLoggedIn' + JSON.stringify(err));
  // }});
  //   } else if (!user) {
  //     // redirect
  //     res.redirect('/signup');
  //   } else {
  //     return next();
  //   }
  // });
  console.log('current session:', sessionId);
  if (!sessionId) {
    console.log('session expired, redirecting to signup');
    res.redirect('/signup');
  } else {
    console.log('session verified');
    return next();
  }
};

/**
 * startSession - create and save a new Session into the database.
 */
sessionController.startSession = (req, res, next) => {
  //write code here
  console.log('entering startSession middleware');
  console.log('cookie ssid', req.cookies.ssid);
  console.log('res.locals id', res.locals.ssid);
  console.log('do they match?', req.cookies.ssid === res.locals.ssid);
  // const ssid = req.cookies.ssid;
  const ssid = res.locals.ssid;

  Session.create({ cookieId: ssid })
    .then((newDoc) => {
      console.log('session started with ', newDoc._id.toHexString());
      return next();
    })
    .catch((err) =>
      next({
        log: 'Express error handler caught startSession error',
        status: 500,
        message: { err: `${err}, error starting session` },
      })
    );

  // const { username } = req.body;
  // User.findOne({username}, '_id', (err, user) => {
  //   if (err) {return next('Error in : sessionController.startSession' + JSON.stringify(err));}
  //   const ssid = user._id.toHexString();
  //   console.log('ssid:', ssid);
  //   Session.create({cookieId: ssid})
  //     .then((newDoc) => {
  //       console.log('new db entry:',newDoc);
  //       return next();
  //     })
  //     .catch((err) => next({
  //       log: 'Express error handler caught startSession error',
  //       status: 500,
  //       message: { err: `${err}, error starting session`}}));
  // });
};

// app.use((req, res, next) => {
//   const ssidCookie = req.cookies.ssid;
//   console.log('ssid cookie:', ssidCookie);
//   next();
// });

module.exports = sessionController;
