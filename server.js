const express = require('express');

const server = express();
server.use(express.json());

server.use(logger);

//users
const userRouter = require('./users/userRouter.js')
server.use('/api/users', userRouter)



server.get('/', (req, res) => {
  res.send(`<h2>Let's write some middleware!</h2>`)
});

//custom middleware

//Logger
function logger(req, res, next) {
  console.log(req.method, req.originalUrl, new Date().toISOString())
  next();
};

// function validaeUserId(req, res, next) {
//   console.log()
//   next();
//   };


module.exports = server;
