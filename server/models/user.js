const mongoose = require('mongoose')
const {ObjectId} =mongoose.Schema.Types

const userschema = new mongoose.Schema({

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
    pic:{
        type:String,
        default:"https://res.cloudinary.com/parindey/image/upload/v1633422213/images_1_mhhkvi.png"
    },
   
    followers:[{type:mongoose.ObjectId,ref:"User"}],
    following:[{type:mongoose.ObjectId,ref:"User"}]
})

mongoose.model("User",userschema)



    /*pic:{
        type:String,
        default:"https://res.cloudinary.com/parindey/image/upload/v1633422213/images_1_mhhkvi.png"
    },*/
   