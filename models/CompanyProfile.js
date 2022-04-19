const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const CompanyProfileSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: "myUser"
}, 
  firmName: {
    type: String,
    default:"",
    required: true
  },
  companyLink: {
    type: String,
    default:"",
    required: true
  },
  
  dealerCode: {
    type: String,
    default:"",
    required: true
  },
  companyGstNo: {
    type: String,
    default:"",
    required: true
  },
  pMobileNumber: {
    type: String,
    default:"",
    required: true
  },
  sMobileNumber: {
    type: String,
    default:"",
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
  },
  city: {
    type: String,
    default:"",
  },
  address: {
    type: String,
    default:"",
  },
  pincode: {
    type: String,
    default:"",
  },
  logo:{
    url:{
     type:String,
     default:"",
    },
    publicId:{
     type:String,
     default:"",
    }
},
  // withPrefix, withoutPrefix, manual
  invoicePrefixType: {
    label:{ 
      type: String,
      default:"",
      required: true
    },
    id:{ 
      type: String,
      default:"",
      required: true
    }
   
  },
  //  invoicePrefix required if 
  // invoice Prefix Type is withPrefix
  invoicePrefix: {
    type: String,
    default:"",
  },
  //  firstInvoiceNo required if 
  // invoice Prefix Type is withoutPrefix
  firstInvoiceNo: {
    type: String,
    default:"",
  },
  needForm21: {
    type: Boolean,
    default:true
  },
  needCustomerSign: {
    type: Boolean,
    default:false
  },
  needProfomaInvoice: {
    type: Boolean,
    default:true
  },
  // trade certificate is mandatory in case of 
  // form21
  tradeCertificateNo: {
    type: String,
    default:"",
    required: true
  },
  // Dealer Info // 
  // if Need Dealer details in any document
  // is true then all below will be reqiuired
  needDealerInfo: {
    type: Boolean,
    default:false
  },
  dealerName: {
    type: String,
    default:"",
  },
  dealerAddress: {
    type: String,
    default:"",
   
  },
  dealerState: {
    state: {
      type: String,
      default:"",
    }, 
  tin: {
    type: String,
    default:"",
  },
  stateCode:{
    type: String,
    default:"",
  }
    
  },
  dealerCity: {
    type: String,
    default:"",
   
  },
  dealerPincode: {
    type: String,
    default:"",
   
  },
  dealerMobileNo: {
    type: String,
    default:"",
   
  },
  needDeOnF20: {
    type: Boolean,
    default:false
  },
  needDeOnF21: {
    type: Boolean,
    default:false
  },
  // if Dealer on form 21
  // need to fill trade certificate
  dealerTradeCertificateNo: {
    type: String,
    default:"",

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
  value: {
    type: String,
    default:"createYourPassword"
  },
});

module.exports = CompanyProfile = mongoose.model("myCompanyProfile", CompanyProfileSchema);




