const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const FinancersSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: "myUser"
}, 
designation:{
  type:String,
  default:""
  },
cGstNo:{
  type:String,
  default:""
  },
// Basic Details
financerName:{
    type:String,
    default:""
    },
financerLink:{
    type:String,
    default:""
    },
////
createdAt: {
    type: Date,
    
  },
  date: {
    type: Date,
    default: Date.now
  },
});

module.exports = Financers = mongoose.model("myFinancers", FinancersSchema);




