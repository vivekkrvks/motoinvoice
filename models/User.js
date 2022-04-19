const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const UserSchema = new Schema({
  
  fullName: {
    type: String,
    default:""
  },
  emailId: {
    type: String,
    default:""
  },
  emailVerified:{
    type:Boolean,
    default: false
  },
  mobileNo: {
    type: String,
    required:true
  },
  mobileVerified:{
    type:Boolean,
    default:false
  },
  password: {
    type: String,
    default:"createYourPassword"
  },
  companyGstNo:{
    type: String,
    default:""
  },
  
////
  // distributor
  designation: {
    type: String,
    default: "admin"
  },
userName: {
  type: String,
  default:""
},
userImage: {
  type: String,
  default:""
},
language:{
  type:String,
  default:"english"
},
  date: {
    type: Date,
    default: Date.now
  },
  value: {
    type: String,
    default:"createYourPassword"
  },
});

module.exports = User = mongoose.model("myUser", UserSchema);




