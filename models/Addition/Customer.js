const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const CustomerSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: "myUser"
    }, 
    firstName:{
    type:String,
    default:""
  },
  middleName:{
    type:String,
    default:""
  },
  lastName:{
    type:String,
    default:""
  },

  date: {
    type: Date,
    default: Date.now
  },
});

module.exports = Customer = mongoose.model("myCustomer", CustomerSchema);




