const path = require("path");
const express = require("express");
const router = require("./lib/router");
const authRouter = require("./lib/authRouter");
const cookieParser = require('cookie-parser');

const PORT = 3001

const app = express()
// Middleware that parses json and looks at requests where the Content-Type header matches the type option.
app.use(express.json());
app.use(express.urlencoded());
app.use(cookieParser());

// Serve authorization requests from the authRouter
app.use("/auth", authRouter)

// Serve API requests from the router
app.use("/api", router)

// Serve app production bundle
app.use(express.static("dist/app"))

// Handle client routing, return all requests to the app
app.get("*", (_req, res) => {
  res.sendFile(path.join(__dirname, "../../dist/app/index.html"))
})

app.use((req, res) => {
  res.status(404).send('File not found');
});

app.use((err, req, res, next) => {
  const defaultErr = {
    log: 'Express error handler caught unknown middleware error',
    status: 500,
    message: { err: 'An error occurred' },
  };
  const errorObj = Object.assign({}, defaultErr, err);
  console.log(errorObj.log);
  return res.status(errorObj.status).json(errorObj.message);
});

app.listen(PORT, () => {
  console.log(`Server listening at http://localhost:${PORT}`)
})
