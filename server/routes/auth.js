
const express = require('express')
const router =express.Router()
const mongoose = require('mongoose')
const User= mongoose.model("User")
const bcrypt = require('bcryptjs')
const jwt =require('jsonwebtoken')
const {JWT_SECRET} =require('../keys')
const requirelogin=require('../middleware/requirelogin')




router.post('/signup',(req,res)=>{
    const{name,email,password,pic}= req.body
    if(!email || !password || !name){
      return  res.status(422).json({error:"please fill out all the fields"})
    }

    User.findOne({email:email})
    .then((savedUser)=> {
        if(savedUser){
            return res.status(422).json({error:"email already taken by existing user"})
        }
        bcrypt.hash(password,12)//bigger the no ,password will be more secure
        .then(hashedpassword=>{
            const user=new User({
                email,
                password:hashedpassword,
                name,
                pic
            })
            user.save()
            .then(user=>{
                res.json({message:"signed up successfully"})
            })
            .catch(err=>{
                console.log(err)
            })
        })
       
    })
    .catch(err=>{
        console.log(err)
    })
    
})

router.post('/signin',(req,res)=>{
    const{email,password}=req.body
    if(!email || !password){
    res.status(422).json({error:"please add email or password"})
    }
    User.findOne({email:email})
    .then(savedUser=>{
        if(!savedUser){
           return res.status(422).json({error:"Invalid email or password"})

        }
        bcrypt.compare(password,savedUser.password)
        .then(domatch=>{
            if(domatch){ //if password didn't match
               // res.json({message:"Successfully Signed In"})
               const token =jwt.sign({_id:savedUser._id},JWT_SECRET)
               const {_id,name,email,followers,following,pic}=savedUser
               res.json({token,user:{_id,name,email,followers,following,pic}})
            }
            else{
                return res.status(422).json({error:"Invalid email or Password"})
            }
        })
        .catch(err=>{
            console.log(err) //error by developer side
        })

    })
})

module.exports=router