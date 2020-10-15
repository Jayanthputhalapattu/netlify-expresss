const mongoose = require('mongoose');
const users = require('./users');
const Schema  = mongoose.Schema;

const Userdata = new Schema({
    "razorpay_order_id" : {
        type : String,
        required  :true,
        unique :true
    },
    "razorpay_payment_id" :{
        type : String,
        required : true,
        unique:true
    },
    "razorpay_signature":{
        type:String ,
        required:true,
        unique:true
    },
    "user":{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User'
    }
    

   

},{
    timestamps : true
})
module.exports = mongoose.model('use',Userdata)