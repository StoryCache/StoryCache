const express = require('express');
const app = express();
const path = require('path');
app.use(express.json());
app.use(express.urlencoded());
const cookieParser = require('cookie-parser');
app.use(cookieParser());
const PORT = 3333;
const entryController = require('./controllers/entryController.js');
const authController = require('./controllers/authController.js');

//serve CSS and JS files in assets folder
app.use(express.static('client'));

//handle routes for blog.html
app.post('/blog/new', entryController.postEntry, (req, res) =>
  res.status(200).json(res.locals.entry)
);
app.get('/blog/entries', entryController.getEntries, (req, res) =>
  res.status(200).json(res.locals.entries)
);
app.delete(
  '/blog/:id',
  authController.checkCookie,
  entryController.deleteEntry,
  (req, res) => res.status(200).json(res.locals.success)
);

//handle routes for signing in from index.html
app.post('/signin', authController.validateUser, (req, res) => {
  if (res.locals.auth === 'admin') res.cookie('token', 'admin');
  else res.cookie('token', 'user');
  res.redirect('/blog');
});

//serve index.html page
// app.use(express.static(path.join(__dirname, '../views/'))); //alternative: express.static('././views/')
app.use((req, res) =>
  res
    .type('.html')
    .status(200)
    .sendFile(path.join(__dirname, '../client/index.html'))
);

// serve 404 error for unknown routes
app.use((req, res) => res.status(404).send('Page not found'));

// global error handling
app.use((err, req, res, next) => {
  const defaultErr = {
    log: 'unknown middleware error',
    status: 500,
    message: { err: 'an unknown middleware error occurred' },
  };
  const errorObj = Object.assign({}, defaultErr, err);
  console.error(errorObj.log);
  res.status(errorObj.status).json(errorObj.message);
});

// start server on PORT with console message
app.listen(PORT, () => console.log('listening on port', PORT));
