const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Contest = new Schema({
    "fullname" :{
        type:String,
        required:true
    },
    "collegename":{
        type:String,
        required:true
    },
    email:{
        type:String,
        unique:true,
        required:true
    }

},{
        timestamps:true
    
})
module.exports = mongoose.model('contest',Contest)
