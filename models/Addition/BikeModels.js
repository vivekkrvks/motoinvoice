const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const BikeModelsSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: "myUser"
}, 
// Basic Details
vehicleName:{
    type:String,
    default:""
  },
modelCode:{
    type:String,
    default:""
  },
makersName:{
    type:String,
    default:""
  },
classOfVehicle:{
    type:String,
    default:""
  },
basePrice:{
    type:String,
    default:""
  },
sgst:{
    type:String,
    default:""
  },
cgst:{
    type:String,
    default:""
  },
exShowroomPrice:{
    type:String,
    default:""
  },
fuelUsed:{
    type:String,
    default:""
  },
horsePower:{
    type:String,
    default:""
  },
noOfCylinders:{
    type:String,
    default:""
  },
cubicCapacity:{
    type:String,
    default:""
  },
seatingCapacity:{
    type:String,
    default:""
  },
unladenWeight:{
    type:String,
    default:""
  },
  // In Case of Transport Vehicle
frontAxle:{
    type:String,
    default:""
  },
rearAxle:{
    type:String,
    default:""
  },
anyOtherAxle:{
    type:String,
    default:""
  },
tandemAxle:{
    type:String,
    default:""
  },
grossVehicleWeight:{
    type:String,
    default:""
  },
wheelBase:{
    type:String,
    default:""
  },
typeOfBody:{
    type:String,
    default:""
  },
noOfTyers:{
    type:String,
    default:""
  },
tankCapacity:{
    type:String,
    default:""
  },
////
language:{
  type:String,
  default:"english"
},

createdAt: {
    type: Date,
    
  },
  date: {
    type: Date,
    default: Date.now
  },
});

module.exports = BikeModels = mongoose.model("myBikeModels", BikeModelsSchema);




