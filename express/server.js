'use strict';
const express = require('express');
const path = require('path');
const serverless = require('serverless-http');
const app = express();
const bodyParser = require('body-parser');
var Razorpay = require('razorpay')
var Userdata = require('./models/userdata');
var mongoose = require('mongoose');
var cors = require('cors')
var Contest = require('./models/contest');
const contest = require('./models/contest');
var uri = "mongodb+srv://jayanth:jayanth1610120@cluster0.rdnwp.mongodb.net/Razor?retryWrites=true&w=majority"

mongoose.connect(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => {
  console.log("MongoDB Connected…")
})
.catch(err => console.log(err))
const router = express.Router();
var instance = new Razorpay({
  key_id: 'rzp_test_RdkiOl654i5b7N',
  key_secret: 'OJQTgrrg1QrxN8P2O0LGHyOG',
 
});

router.get('/', (req, res) => {
  res.writeHead(200, { 'Content-Type': 'text/html' });
  res.write('<h1>Hello from Express.js!</h1>');
  res.end();
});


router.get('/checkk',(req,res,next)=>{
  
  var options = {
  amount: 100,  // amount in the smallest currency unit
  currency: "INR",
  receipt: "order_rcptid_11",
  payment_capture: '0'
};
instance.orders.create(options, function(err, order) {

  res.send(order)
});
})
router.post("/succeescallback",(req,res,next)=>{
     
  
    Userdata.create(req.body)
    .then((user)=>{
           res.statusCode = 200;
           res.setHeader('Content-Type','application/json');
           res.send(true);
           res.redirect('http:localhost:3001/success')
          //  console.log('inserted succesfully ')
           
    },err=>next(err))
    
  
   
})
router.post('/find',(req,res,next)=>{
  contest.findOne({email:req.body.email})
  .then((email)=>{
    if(email)
    {
      res.send(true)
    }
    else{
      res.send(false)
    }
})
})
router.post('/register/contest',(req,res,next)=>{
   Contest.create(req.body)
   .then((contest)=>{
     res.statusCode = 200;
     res.setHeader('Content-Type','application/json');
     res.json(contest);
     console.log('inserted succesfully ')
   },err=>next(err))
   .catch((err)=>next(err))
})

app.use(cors());
app.use(bodyParser.json());
app.use('/.netlify/functions/server', router);  // path must route to lambda
app.use('/', (req, res) => res.sendFile(path.join(__dirname, '../index.html')));

module.exports = app;
module.exports.handler = serverless(app);
