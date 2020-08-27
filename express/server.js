'use strict';
const express = require('express');
const path = require('path');
const serverless = require('serverless-http');
const app = express();
var Razorpay = require('razorpay')
const bodyParser = require('body-parser');
var Userdata = require('./models/userdata');
var mongoose = require('mongoose');
var uri = "mongodb+srv://jayanth:jayanth1610120@cluster0.rdnwp.mongodb.net/Razor?retryWrites=true&w=majority"

var bodyParser = require('body-parser')

app.use(bodyParser.json());

const router = express.Router();
mongoose.connect(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => {
  console.log("MongoDB Connected…")
})
.catch(err => console.log(err))
var instance = new Razorpay({
  key_id: 'rzp_test_RdkiOl654i5b7N',
  key_secret: 'OJQTgrrg1QrxN8P2O0LGHyOG',
 
});
router.get('/',(req,res,next)=>{
    res.send("HELLO WORLD!")
})
router.get('/check',(req,res,next)=>{
  
  var options = {
  amount: 100,  // amount in the smallest currency unit
  currency: "INR",
  receipt: "order_rcptid_11",
  payment_capture: '0'
};
instance.orders.create(options, function(err, order) {
  console.log(order);
  res.send(order)
});
})
router.post("/succeescallback",(req,res,next)=>{
	   
    Userdata.create(req.body)
    .then((user)=>{
      res.statusCode = 200;
           res.setHeader('Content-Type','application/json');
           res.json(user);
           console.log('inserted succesfully')
           
    },err=>next(err))
    .catch((err)=>next(err))
})
router.get('/another', (req, res) => res.json({ route: req.originalUrl }));


app.use(bodyParser.json());
app.use('/.netlify/functions/server', router);  // path must route to lambda
app.use('/', (req, res) => res.sendFile(path.join(__dirname, '../index.html')));

module.exports = app;
module.exports.handler = serverless(app); 
