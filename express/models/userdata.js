const mongoose = require('mongoose');
const Schema  = mongoose.Schema;

const Userdata = new Schema({
    "razorpay_order_id" : {
        type : String,
        required  :true,
        unique :true
    },
    "razorpay_payment_id" :{
        type : String,
        required : true
    },
     "razorpay_signature":{
        type:String ,
        required:true,
        unique:true
    }

   

},{
    timestamps : true
})
module.exports = mongoose.model('user',Userdata)
