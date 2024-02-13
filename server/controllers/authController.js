module.exports = {
    validateUser: (req, res, next) => {
      console.log(req.body);
  
      //wrote signin.js to send user and pass on req.body, but not successfully finished
      const { user, pass } = req.body;
      // console.log(user, pass);
  
      const regUser = {
        user: 'codesmith',
        pass: 'ilovetesting',
      };
      const admin = {
        user: 'codesmith_admin',
        pass: 'testingisgreat',
      };
  
      //check if admin login successfully
      if (user === admin.user && pass === admin.pass) {
        console.log('yer an admin, arry');
        res.locals.auth = 'admin';
        return next();
      } else if (user === regUser.user && pass === regUser.pass) {
        console.log('yer an user');
        res.locals.auth = 'user';
        return next();
      } else {
        return next({
          message: 'You must be signed in to view this page',
          status: 401,
          log: 'You must be signed in to view this page',
        });
      }
    },
  
    checkCookie: (req, res, next) => {
      if (req.cookies.token === 'admin' || req.cookies.token === 'user')
        return next();
      else
        return next({
          message: 'You must be signed in to view this page',
          status: 401,
          log: 'You must be signed in to view this page',
        });
    },
  };
  