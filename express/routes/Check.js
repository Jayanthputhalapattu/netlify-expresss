var express = require('express')


var router = express.Router();
var bodyParser = require('body-parser');
var Razorpay = require('razorpay');
const { verify } = require('jsonwebtoken');
// const authenticate  = require('');

const { verifyUser } = require('../authenticate');
router.use(bodyParser.json());
var instance = new Razorpay({
    key_id: 'rzp_live_mvXKJ9AvmwCwaz',
    key_secret: 'uW23U93zXIWW71ox4EgMHuEZ',
   
  });
//   var instance = new Razorpay({
//   key_id: 'rzp_test_RdkiOl654i5b7N',
//   key_secret: 'OJQTgrrg1QrxN8P2O0LGHyOG',
 
// });


router.get('/',verifyUser,(req,res,next)=>{
  
    var options = {
    amount: 100,  // amount in the smallest currency unit
    currency: "INR",
    receipt: "order_rcptid_11",
    payment_capture: '0'
  };
  instance.orders.create(options, function(err, order) {

    res.send(order)
})

})
module.exports = router