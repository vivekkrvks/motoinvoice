const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const IndiaStateSchema = new Schema({

    stateName:{
    type:String,
    default:""
  },
  tin:{
    type:String,
    default:""
  },
  stateCode:{
    type:String,
    default:""
  },

  date: {
    type: Date,
    default: Date.now
  },
});

module.exports = IndiaState = mongoose.model("myIndiaState", IndiaStateSchema);




