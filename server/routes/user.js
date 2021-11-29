const express=require('express')
const router=express.Router();  //create router
const mongoose = require('mongoose')
const requireLogin = require('../middleware/requireLogin')
const Post = mongoose.model("Post")
const User =mongoose.model("User")


router.get('/user/:id',requireLogin,(req,res)=>{
      User.findOne({_id:req.params.id})
      .select("-password")
      .then(user=>{
            Post.find({postedBy:req.params.id})
            .populate("postedBy","_id name")
            .exec((err,posts)=>{
                if(err){
                    return res.status(422).json({error:err})
                    }
                    res.json({user,posts})
            })
      }).catch(err=>{
          return res.status(404).json({error:"User not found"})
      })
})



/*router .put('/follow',(req,res)=>{
    User.findByIdAndUpdate(req.body.followId,{
        $push:{followers:req.user._id}
    },{
        new:true
    },(err,result)=>{
        if(err){
            return res.status(422).json({error:err})
        }
        User.findOneAndUpdate(req.user._id,{
            $push:{following:req.body.followId}
            
        },{new:true}).then(result=>{
            res.json(result)
        }).catch(err=>{
            return res.status(422).json({error:err})
        })

    }
    
    )
    
    
})


router .put('/unfollow',(req,res)=>{
    User.findByIdAndUpdate(req.body.followId,{
        $pull:{followers:req.user._id}
    },{
        new:true
    },(err,result)=>{
        if(err){
            return res.status(422).json({error:err})
        }
        User.findOneAndUpdate(req.user._id,{
            $pull:{following:req.body.followId}
            
        },{new:true}).then(result=>{
            res.json(result)
        }).catch(err=>{
            return res.status(422).json({error:err})
        })

    }
    
    )
    
    
})*/

router.put('/follow',requireLogin,(req,res) => {
    User.findByIdAndUpdate(req.body.followId,{  //followId will be the id of person2 provided from the frontend
        $push:{followers:req.user._id}  //req.user._id is the is of person1 who is cuurently logged in, can be get fron backend
    },{                                    //push person1 id into follower array of person2
        new:true
    },(err,result) => {
        if(err){
            return res.status(422).json({error : err})
        }

        User.findByIdAndUpdate(req.user._id,{
            $push:{following:req.body.followId} //push person2 id into following array of person1
        },{
            new:true
        }).select("-password")
        .then(result =>{
            res.json(result)
        }).catch(err => {
            return res.status(422).json({error : err})
        })
    })
})


router.put('/unfollow',requireLogin,(req,res) => {
    User.findByIdAndUpdate(req.body.unfollowId,{
        $pull:{followers:req.user._id}
    },{
        new:true
    },(err,result) => {
        if(err){
            return res.status(422).json({error : err})
        }

        User.findByIdAndUpdate(req.user._id,{
            $pull:{following:req.body.unfollowId}
        },{
            new:true
        }).select("-password")
        .then(result =>{
            res.json(result)
        }).catch(err => {
            return res.status(422).json({error : err})
        })
    })
})


router.put('/updatepic',requireLogin,(req,res) => {
    User.findByIdAndUpdate(req.user._id,{ $set:{pic:req.body.pic} },{new : true},(err,result) =>{
        if(err){
            return res.status(422).json({error : "pic cannot update"})
        }
        res.json(result)
    })
    
})

module.exports = router