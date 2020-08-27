var express = require('express');
var app = express();
var Razorpay = require('razorpay')
var Userdata = require('./models/userdata');
var mongoose = require('mongoose');
var uri = "mongodb+srv://jayanth:jayanth1610120@cluster0.rdnwp.mongodb.net/Razor?retryWrites=true&w=majority"
// var connect = mongoose.connect(url);
var bodyParser = require('body-parser')
var cors = require('cors')
// connect.then((db)=>{
//   console.log('succesfully linked to the database')
// })
mongoose.connect(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => {
  console.log("MongoDB Connected…")
})
.catch(err => console.log(err))
// var instance = new Razorpay({
//   key_id: 'rzp_live_mvXKJ9AvmwCwaz',
//   key_secret: 'uW23U93zXIWW71ox4EgMHuEZ',
 
// });
var instance = new Razorpay({
  key_id: 'rzp_test_RdkiOl654i5b7N',
  key_secret: 'OJQTgrrg1QrxN8P2O0LGHyOG',
 
});


 
var fs = require('fs')
app.use(cors())
app.use(bodyParser.json())
app.get('/',(req,res,next)=>{
    res.send("HELLO WORLD!")
})
app.get('/check',(req,res,next)=>{
  
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
app.post("/succeescallback",(req,res,next)=>{
	   
    Userdata.create(req.body)
    .then((user)=>{
      res.statusCode = 200;
           res.setHeader('Content-Type','application/json');
           res.json(user);
           console.log('inserted succesfully')
           
    },err=>next(err))
    .catch((err)=>next(err))
})
app.get("/contacts", function(req, res) {
  res.setHeader('Content-Type','application/json');
  res.send(contacts);
 
});

app.listen(5000,()=>{
    console.log("server started")
})