const mongoose=require('mongoose');
const jwt=require('jsonwebtoken')
const userSchema = mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    },
})



module.exports=mongoose.model('User',userSchema);