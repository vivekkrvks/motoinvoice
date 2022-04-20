const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const FinancesSchema = new Schema({
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
financerCode:{
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

module.exports = Finances = mongoose.model("myFinances", FinancesSchema);




