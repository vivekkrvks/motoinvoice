const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const InvoiceSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: "myUser"
}, 
// Basic Details Start

// customerInvoice otherInvoice returnInvoice
invoiceType:{
    label:{
      type:String,
      default:""
    },
    value :{
    type:String,
    default:""
  }
  },

customerFirstName:{
    type:String,
    default:""
  },
customerMiddleName:{
    type:String,
    default:""
  },
customerLastName:{
    type:String,
    default:""
  },
customerReferenceName:{
    type:String,
    default:""
  },
  // for customer invoice only end
  // for other start
  dealerName:{
    type:String,
    default:""
  },
  purchaseInvoiceDate:{
    type:String,
    default:""
  },
  purchaseInvoiceNumber:{
    type:String,
    default:""
  },
customerPhoneNumber:{
    type:String,
    default:""
  },
  invoiceNumber:{
    type:String,
    default:""
  },
email:{
    type:String,
    default:""
    },
gst:{
    type:String,
    default:""
    },
stateDetail: {

  state: {
      type: String,
      default:"",
    }, 
  tin: {
    type: String,
    default:"",
    },
    stateCode: {
      type: String,
      default:"",
      },
},
address:{
    type:String,
    default:""
    },
city:{
    type:String,
    default:""
    },
pincode:{
    type:String,
    default:""
    },
customerSecondaryAddress:{
    type:String,
    default:""
    },
// Basic Details End
// Invoice Details Start
    model:{
        vehicle:{
            type:String,
            default:""
        },
        quantity:{
          type:String,
          default:""
      },
        code:{
            type:String,
            default:""
        },
        amount:{
          type:number,
          default:""
      },
        sgst:{
          type:number,
          default:""
      },
        cgst:{
          type:number,
          default:""
      },
        igst:{
          type:number,
          default:""
      },
      roundOff:{
        type:number,
        default:""
    },
      discount:{
        type:number,
        default:""

    },
    totalAmount:{
      type:number,
      default:""
  
  },
  },

cessAmountOnBasePrice:{
  type:number,
  default:""

},
handlingChargesOnBasePrice:{
  type:number,
  default:""

},
hsn:{
  type:number,
  default:""

},
chassisNumber:{
  type:number,
  default:""

},
engineNumber:{
  type:number,
  default:""

},
color:{
  type:number,
  default:""

},
battery:{
  type:number,
  default:""

},
keyNumber:{
  type:number,
  default:""

},
manufacturing:{
  type:number,
  default:""

},
dueAmount:{
  type:number,
  default:""

},
invoiceDate:{
  type:number,
  default:""

},
paymentMode:{
  type:number,
  default:""

},
financerName:{
  type:number,
  default:""

},
termsOfDelivery:{
  type:number,
  default:""

},
accessories:[
  {
    brand:{
      type:number,
      default:""
    
    },
    code:{
      type:number,
      default:""
    
    },
    price:{
      type:number,
      default:""
    
    },
    sgst:{
      type:number,
      default:""
    
    },
    cgst:{
      type:number,
      default:""
    
    },
    igst:{
      type:number,
      default:""
    
    },
    discount:{
      type:number,
      default:""
    
    },
    manufacturer:{
      type:number,
      default:""
    
    },
    total:{
      type:number,
      default:""
    
    },
  }
],
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

module.exports = Invoice = mongoose.model("myInvoice", InvoiceSchema);




