'use strict';
const express = require('express');
const path = require('path');
const serverless = require('serverless-http');
const app = express();
const bodyParser = require('body-parser');
const Check = require('./routes/Check')
const user = require('./routes/users')
var mongoose = require('mongoose');
var cors = require('cors')
var session = require('express-session')
var Userdata = require('./models/userdata')
var passport = require('passport');
const { verifyUser } = require('./authenticate');
var uri = "mongodb+srv://jayanth:jayanth1610120@cluster0.rdnwp.mongodb.net/Razor?retryWrites=true&w=majority"
var FileStore = require('session-file-store')(session)
const use = require('./models/userdata')
mongoose.connect(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => {
  console.log("MongoDB Connected…")
})
.catch(err => console.log(err))
const router = express.Router();
app.use(passport.initialize());
router.get('/', (req, res) => {
  res.writeHead(200, { 'Content-Type': 'text/html' });
  res.write('<h1>Hello from Express.js!</h1>');
  res.end();
});
router.use('/checkk',Check)
router.use('/user',user)
router.post("/succeescallback",verifyUser,(req,res,next)=>{
   var data = req.body;
   data["user"] = req.user._id
    Userdata.create(data)
    .then((user)=>{
           res.statusCode = 200;
           res.setHeader('Content-Type','application/json');
           res.send(true) 
    },err=>next(err))

})
router.get("/payment",verifyUser,(req,res,next)=>{
  use.find({user:req.user._id})
  .then((data)=>{
    res.json(data)
  })
  
   

})


app.use(cors())
app.use(bodyParser.json());
app.use('/.netlify/functions/server', router);  // path must route to lambda
app.use('/', (req, res) => res.sendFile(path.join(__dirname, '../index.html')));

module.exports = app;
module.exports.handler = serverless(app);
