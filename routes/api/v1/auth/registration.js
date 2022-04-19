const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jsonwt = require("jsonwebtoken");
const passport = require("passport");
const key = require("../../../../setup/myurl");
const jwt_decode = require("jwt-decode");
const User = require("../../../../models/User")
const axios = require("axios")

// makeid used during signup
function makeid(k)
{ 

let l = 3
var text = "";
var char_list = "abcdefghijklmnopqrstuvwxyz0123456789";
for(var i=0; i < l; i++ )
{  
text += char_list.charAt(Math.floor(Math.random() * char_list.length));
}
return text;
}

// Route to Register User 
// /api/v1/auth/registration/save/user/
router.post('/save/user/', (req,res) => {


  if((req.body.emailId == "" || req.body.emailId == null || req.body.emailId == undefined)
  && (req.body.mobileNo == "" || req.body.mobileNo == null || req.body.mobileNo == undefined)){
    res.json({
      message: "Email Id or Mobile Number is required",
      variant: "error"
    })
  } else if(req.body.password == "" || req.body.password == null || req.body.password == undefined){
    res.json({
      message: "Password is required",
      variant: "error"
    })
  }
  else if(req.body.fullName == "" || req.body.fullName == null || req.body.fullName == undefined){
    res.json({
      message: "Full Name is required",
      variant: "error"
    })
  }
  else if(req.body.companyGstNo == "" || req.body.companyGstNo == null || req.body.companyGstNo == undefined){
    res.json({
      message: "Company GST No is required",        
      variant: "error"
    })
  }
  else{
    checkDuplicate(req,res)
  }
})
const checkDuplicate = async(req,res) => { 
  User.findOne({emailId:req.body.emailId})
  .then(user => {
    if(user)
    {
      res.json({
        message: "Email Id Already Exists",
        variant: "error"
      })
    }
    else {
      User.findOne({mobileNo:req.body.mobileNo})
      .then(user => {
        if(user)
        {
          res.json({
            message: "Mobile Number Already Exists",
            variant: "error"
          })
        }
        else {
          User.findOne({companyGstNo:req.body.companyGstNo})
          .then(user => {
            if(user)
            {
              res.json({
                message: "Mobile Number Already Exists",
                variant: "error"
              })
            }
            else {
              saveUser(req,res)
            }
          })
          .catch(err => {
            res.json({
              message: "Problem in saving",
              variant: "error"
            })
          })          
        }
      })
      .catch(err => {
        res.json({
          message: "Problem in saving",
          variant: "error"
        })
      })
    }
  }).catch(err => {
    res.json({
      message: "Problem in saving",
      variant: "error"
    })
  })
}
const saveUser = async(req,res) => { 
  var str = req.body.fullName;
  //Now I separate them by "|"
  var str1 = str.split(" ");
  var str2 = str1[0]
  var str4
    var str3 = await makeid(Math.floor(Math.random()*10))
  
   str4 = str2+"."+str3
  
    newUser = new User({
      fullName: req.body.fullName,
      mobileNo: req.body.mobileNo,
      emailId: req.body.emailId,
      password: req.body.password,
      companyGstNo: req.body.companyGstNo,
     
      value:str4+req.body.password + str4,
      userName:str4,
  
     
    });
  
  
    bcrypt.genSalt(10, (err, salt) => {
      bcrypt.hash(newUser.password, salt, (err, hash) => {
        if (err) throw err;
        newUser.password = hash;
        newUser
          .save()
          .then(() =>
            res.json({
              message: "Congratulation ! Your Account is Successfully Created ",
              variant: "success"
            })
            
          )
          .catch(err =>
            res.json(
              {
                message: "Problem in saving",
                variant: "error"
              } + err
            )
          );
      });
    });
}



module.exports = router;
