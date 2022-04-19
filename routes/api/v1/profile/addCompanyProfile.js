const express = require("express");
const router = express.Router();
const passport = require("passport");

const img = require("../../../../setup/myimageurl")

//Load User Model
const User = require("../../../../models/User");

//Load companyProfile.js Model
const CompanyProfile = require("../../../../models/CompanyProfile");
function generateString(length) {
  // function to generate random character
  // declare all allChar
  const allChar ='ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
      let result = ' ';
      const allCharLength = allChar.length;
      for ( let i = 0; i < length; i++ ) {
          result += allChar.charAt(Math.floor(Math.random() * allCharLength));
      }
  
      return result;
  }
// @type    POST
//@route    /api/v1/profile/addCompanyProfile/
// @desc    route for SAVING data for companyProfile
// @access  PRIVATE
router.post(
  "/",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    console.log(req.body)
    console.log("req.body")
    const companyProfileValues = { stateDetail:{},invoicePrefixType:{},logo:{}, dealerState:{} };
    companyProfileValues.user = req.user.id;
    companyProfileValues.firmName = req.body.firmName;
    let ran = generateString(8);
    var strs = req.body.firmName;
    var ran2 = strs.replace(/  | |   |    |      /gi, function (x) {
      return  "";
    });
    let rests = ran2 + ran;
    companyProfileValues.companyLink = rests.toLowerCase()
    companyProfileValues.dealerCode = req.body.dealerCode;
    companyProfileValues.companyGstNo = req.user.companyGstNo;
    companyProfileValues.pMobileNumber = req.user.mobileNo;
    companyProfileValues.sMobileNumber = req.body.sMobileNumber;
    companyProfileValues.stateDetail.state = req.body.stateDetail.state;
    companyProfileValues.stateDetail.tin = req.body.stateDetail.tin;
    companyProfileValues.stateDetail.stateCode = req.body.stateDetail.stateCode;
    companyProfileValues.city = req.body.city;
    companyProfileValues.address = req.body.address;
    companyProfileValues.pincode = req.body.pincode;
    companyProfileValues.logo.url = req.body.logoUrl;
    companyProfileValues.logo.publicId = req.body.logoId;
    companyProfileValues.invoicePrefixType.label = req.body.invoicePrefixType.label;
    companyProfileValues.invoicePrefixType.id = req.body.invoicePrefixType.id;
    companyProfileValues.invoicePrefix = req.body.invoicePrefix;
    companyProfileValues.firstInvoiceNo = req.body.firstInvoiceNo;
    companyProfileValues.needForm21 = req.body.needForm21;
    companyProfileValues.needCustomerSign = req.body.needCustomerSign;
    companyProfileValues.needProfomaInvoice = req.body.needProfomaInvoice;
    companyProfileValues.tradeCertificateNo = req.body.tradeCertificateNo;
    companyProfileValues.needDealerInfo = req.body.needDealerInfo;
    companyProfileValues.dealerName = req.body.dealerName;
    companyProfileValues.dealerAddress = req.body.dealerAddress;
    companyProfileValues.dealerState.state = req.body.dealerState.state;
    companyProfileValues.dealerState.tin = req.body.dealerState.tin;
    companyProfileValues.dealerState.stateCode = req.body.dealerState.stateCode;
    companyProfileValues.dealerCity = req.body.dealerCity;
    companyProfileValues.dealerPincode = req.body.dealerPincode;
    companyProfileValues.dealerMobileNo = req.body.dealerMobileNo;
    companyProfileValues.needDeOnF20 = req.body.needDeOnF20;
    companyProfileValues.needDeOnF21 = req.body.needDeOnF21;
    companyProfileValues.dealerTradeCertificateNo = req.body.dealerTradeCertificateNo;

    companyProfileValues.createdAt = new Date();

    checkInfo(req, res,companyProfileValues)

  });

  const checkInfo = async(req, res,companyProfileValues) => {
    console.log("inside check info")
    if(companyProfileValues.pMobileNumber == companyProfileValues.sMobileNumber){
      res.json({ message: "Primary and Secondary Mobile Number shouldn't be same", variant: "error" })
    } else if (!(companyProfileValues.firmName && 
      companyProfileValues.dealerCode &&
      companyProfileValues.companyGstNo &&
      companyProfileValues.pMobileNumber &&
    
      companyProfileValues.stateDetail &&
      companyProfileValues.city &&
      companyProfileValues.address &&
      companyProfileValues.pincode &&

      companyProfileValues.invoicePrefixType &&
      
      (companyProfileValues.needForm21 == true || 
        companyProfileValues.needForm21 == false
        ) &&
      (companyProfileValues.needCustomerSign == true ||
        companyProfileValues.needCustomerSign == false
        
        ) &&
      (companyProfileValues.needProfomaInvoice == true ||
        companyProfileValues.needProfomaInvoice == false        
        ) &&
    // needDealerInfo 
      (companyProfileValues.needDealerInfo == true ||
        companyProfileValues.needDealerInfo == false
      )
    
      )) {
      res.json({ message: "Please fill all the required fields", variant: "error" })
    }
       else if (
        companyProfileValues.needDealerInfo ==true && (
          !(companyProfileValues.dealerName &&
            companyProfileValues.dealerAddress &&
            companyProfileValues.dealerState &&
            companyProfileValues.dealerCity &&
            companyProfileValues.dealerPincode &&
            companyProfileValues.dealerMobileNo &&
            companyProfileValues.dealerTradeCertificateNo &&
            (companyProfileValues.needDeOnF20 == true ||
              companyProfileValues.needDeOnF20 == false
              ) &&
            (companyProfileValues.needDeOnF21 == true ||
              companyProfileValues.needDeOnF21 == false
            )  

          )
        )
       ) {
        res.json({ message: "Please fill all fields of Dealer info", variant: "error" })
      } else {
        checkInDb(req, res,companyProfileValues)

      }

     }
const checkInDb = (req,res,companyProfileValues) => {
  console.log("inside check in db")
  CompanyProfile.findOne({
    user: req.user._id,
    companyGstNo: req.user.companyGstNo,
  })
  .then(companyProfile => {
    if(companyProfile){
      upDateMe(req,res,companyProfileValues,companyProfile._id)
    } else {
      CompanyProfile.findOne({
        firmName: companyProfileValues.firmName,
        dealerCode: companyProfileValues.dealerCode,
       }).then(companyProfile => {
         
         if(companyProfile){
           res.json({ message: "Company already exists", variant: "error" })
         } else {
            saveMeInDb(req,res,companyProfileValues)
          }
    
   })
  .catch(err => { console.log(err) })
  }
})

}
const saveMeInDb = (req,res,companyProfileValues) => {
  console.log("inside save me in db")
  new CompanyProfile(companyProfileValues)
  .save()
  .then(
    res.json({
      message: "Successfully saved",
      variant: "success"
    })
  )
  .catch(err => console.log(err));
}
const upDateMe = (req,res,companyProfileValues,dataId) => { 
  console.log("inside up date me")
  CompanyProfile.findOneAndUpdate(  
    { _id: dataId },
    { $set: companyProfileValues },
    { new: true })
  .then(companyProfile => {
    res.json({
      message: "Successfully updated",
      variant: "success"
    })
  })
  .catch(err => console.log(err));
}
// @type    POST
//@route    /api/v1/profile/addCompanyProfile/updateImage/:id
// @desc    route to update/edit companyProfile
// @access  PRIVATE

router.post("/updateImage/:id",
passport.authenticate("jwt", { session: false }),
 (req, res) => {
  const cValue = {logo:{}};
    if(req.body.logoUrl)cValue.logo.url = req.body.logoUrl;
    if(req.body.logoUrl)cValue.logo.id = req.body.logoId;
    console.log(req.params.id)
    CompanyProfile.findOne({_id:req.params.id})
    .then(companyProfile => {
      if(companyProfile){
        updateMe(req,res,cValue)
      }else{
        res.json({message:"Company Not Found",variant:"error"})
      }
    })
    .catch(err => console.log(err));

})


// route to get data of companyProfile
//  /api/v1/profile/addCompanyProfile/getProfile
router.get("/getProfile",
passport.authenticate("jwt", { session: false }),
 (req, res) => {

  CompanyProfile.findOne({user:req.user.id})
  .then(companyProfile => {
    if(companyProfile){
     sendData(res,companyProfile)      
    }else{
      CompanyProfile.findOne({companyGstNo:req.user.companyGstNo})
      .then(companyProfile => {
        if(companyProfile){
         sendData(res,companyProfile)
          }else{
            res.json({
              pMobileNumber:req.user.mobileNo,
              pEmail:req.user.email,
              companyGstNo:req.user.companyGstNo,
            })
          }
      })
      .catch(err => console.log(err));
    }
  })
  .catch(err => console.log(err));

 })

 const  sendData = (res,companyProfile) => {

      res.json(companyProfile)

 }



module.exports = router;
