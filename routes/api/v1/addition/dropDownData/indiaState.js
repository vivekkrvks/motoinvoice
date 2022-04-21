const express = require("express");
const router = express.Router();
const passport = require("passport");

const IndiaState = require("../../../../../models/Addition/DropDownData/IndiaState");

// @type    POST
//@route    /api/v1/addition/dropDownData/indiaState/
// @desc    route for SAVING data for indiaState
// @access  PRIVATE
router.get(
  "/",
  async(req, res) => {
    let i = 0;
    while(i<stateData.length){
      let stateD = stateData[i]
      const stateValue = {
      
      };
      stateValue.state = stateD.state;
      stateValue.tin = stateD.tin;
      stateValue.stateCode = stateD.stateCode;
await saveThis(req,res,stateValue)
      i++
    }
res.json({ message: "Successfully saved all state", variant: "success" })
    }
);

const saveThis = (req,res,stateValue) => {

if(
  stateValue.state == undefined || stateValue.state == "" ||
  stateValue.tin == undefined || stateValue.tin == "" ||
  stateValue.stateCode == undefined || stateValue.stateCode == "" 

){

console.log({
message: "state are Required field",
variant: "error"
})  
} else {    
      IndiaState.findOne({
        tin: stateValue.tin
      })
        .then(indiaState => {
          //Username already exists
          if (indiaState) {
            console.log({
              message: "state Already exist ",
              variant: "error"
            });
          } else {
            new IndiaState(stateValue)
            .save()
            .then(
              console.log({
                message: `${stateValue.state}Successfully saved`,
                variant: "success"
              })
            )
            .catch(err => console.log(err));
          }
        })
        .catch(err => console.log(err));    

}}
// @type    GET
//@route    /api/v1/addition/dropDownData/indiaState/allindiaState
// @desc    route for getting all data from  indiaState
// @access  PRIVATE
router.get(
  "/allindiaState", 
  async(req, res) => {
    let IndiaState1 = await IndiaState.aggregate([
      {$sort:{state:-1}}
  
      ]).exec()  
      res.json(IndiaState1)
  }
);

// @type    get
//@route    /api/v1/addition/dropDownData/indiaState/get/:id
// @desc    route to get single indiaState by id
// @access  PRIVATE
router.get(
  "/get/:id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    IndiaState.findOne({
      _id: req.params.id
    }).then(IndiaState => res.json(IndiaState)).catch(err => res.json({message: "Problem in finding With this Id", variant: "error"}));
  }
);

// @type    POST
//@route    /api/v1/addition/dropDownData/indiaState/:id
// @desc    route to update/edit indiaState
// @access  PRIVATE
async function updateMe(req,res,stateValue){

  IndiaState.findOneAndUpdate(
    { _id: req.params.id },
    { $set: stateValue },
    { new: true }
  )
    .then(indiaState => {
      if (indiaState){
        res.json({ message: "Updated successfully!!", variant: "success" })

      } else {
        res.json({ message: "Id not found", variant: "error" })

      }
    }        
    )

    .catch(err =>
      console.log("Problem in updating indiaState value" + err)
    );




}

router.post(
  "/:id",
  passport.authenticate("jwt", { session: false }),
  async(req, res) => {
    const stateValue = {
      
    };
    stateValue.user = req.user.id;
    stateValue.state = req.body.state;
    stateValue.createdAt = Date.now();
    stateValue.designation = req.user.designation;
    stateValue.cGstNo = req.user.companyGstNo;
//link start

    var strs = req.body.state;
    var rests = strs.replace(/  | |   |    |      /gi, function (x) {
      return  "";
    });
    stateValue.link = rests.toLowerCase()
// link end

    //Do database stuff
if(
  req.body.state == undefined || req.body.state == "" 

){

  res.json({
    message: "state are Required field",
    variant: "error"
})

  
    } else {
    
          IndiaState.findOne({
            state: stateValue.state
          })
            .then(indiaState => {
              //Username already exists
              if (indiaState) {
                res.json({
                  message: "state Already exist ",
                  variant: "error"
                });
              } else {
                updateMe(req,res,stateValue)
              }
            })
            .catch(err => console.log(err));    

    }
}
);


// @type    GET
//@route    /api/v1/addition/dropDownData/indiaState/allindiaState/:searchindiaState
// @desc    route for searching of indiaState from searchbox using any text
// @access  PRIVATE
router.get(
  "/allindiaState/:searchindiaState",
  passport.authenticate("jwt", { session: false }),
  async(req, res) => {
    const search = req.params.searchindiaState;
    if (isNaN(search)) {
      let IndiaState1 = await IndiaState.aggregate([
        {$match: {cGstNo:req.user.companyGstNo,
          state: new RegExp(search, "i")
        } },  
        {$project: { state: 1,createdAt:1 }},
        {$sort:{date:-1}}
    
        ]).exec()  
        res.json(IndiaState1)
    } 
  }
);

// @type    POST DELETE
//@route    /api/v1/addition/dropDownData/indiaState/delete/:id
// @desc    route for personnal user question
// @access  PRIVATE

router.delete(
  "/delete/:id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const id = req.params.id;
    IndiaState.findOne({ _id: id }).then(IndiaStateResult => {
      if (IndiaStateResult) {
        IndiaState.findOneAndDelete({ _id: id })
          .then(() =>
            res.json({ message: "Deleted successfully", variant: "success" })
          )
          .catch(err =>
            res.json("Failed to delete due to this error - " + err)
          );
      } else {
        res
          .status(400)
          .json({ message: "Financer Not Found", variant: "error" });
      }
    });
  }
);

module.exports = router;

const stateData = [
    {state:"Andhra Pradesh",tin:"37",stateCode:"AD"},
    {state:"Arunachal Pradesh",tin:"12",stateCode:"AR"},
    {state:"Assam",tin:"18",stateCode:"AS"},
    {state:"Bihar",tin:"10",stateCode:"BR"},
    {state:"Chattisgarh",tin:"22",stateCode:"CG"},
    {state:"Delhi",tin:"07",stateCode:"DL"},
    {state:"Goa",tin:"30",stateCode:"GA"},
    {state:"Gujarat",tin:"24",stateCode:"GJ"},
    {state:"Haryana",tin:"06",stateCode:"HR"},
    {state:"Himachal Pradesh",tin:"02",stateCode:"HP"},
    {state:"Jammu and Kashmir",tin:"01",stateCode:"JK"},
    {state:"Jharkhand",tin:"20",stateCode:"JH"},
    {state:"Karnataka",tin:"29",stateCode:"KA"},
    {state:"Kerala",tin:"32",stateCode:"KL"},
    {state:"Lakshadweep Islands",tin:"31",stateCode:"LD"},
    {state:"Madhya Pradesh",tin:"23",stateCode:"MP"},
    {state:"Maharashtra",tin:"27",stateCode:"MH"},
    {state:"Manipur",tin:"14",stateCode:"MN"},
    {state:"Meghalaya",tin:"17",stateCode:"ML"},
    {state:"Mizoram",tin:"15",stateCode:"MZ"},
    {state:"Nagaland",tin:"13",stateCode:"NL"},
    {state:"Odisha",tin:"21",stateCode:"OD"},
    {state:"Pondicherry",tin:"34",stateCode:"PY"},
    {state:"Punjab",tin:"03",stateCode:"PB"},
    {state:"Rajasthan",tin:"08",stateCode:"RJ"},
    {state:"Sikkim",tin:"11",stateCode:"SK"},
    {state:"Tamil Nadu",tin:"33",stateCode:"TN"},
    {state:"Telangana",tin:"36",stateCode:"TS"},
    {state:"Tripura",tin:"16",stateCode:"TR"},
    {state:"Uttar Pradesh",tin:"09",stateCode:"UP"},
    {state:"Uttarakhand",tin:"05",stateCode:"UK"},
    {state:"West Bengal",tin:"19",stateCode:"WB"},
    {state:"Andaman and Nicobar Islands",tin:"35",stateCode:"AN"},
    {state:"Chandigarh",tin:"04",stateCode:"CH"},
    {state:"Dadra and Nagar Haveli and Daman and Diu",tin:"26",stateCode:"DNHDD"},
    {state:"Ladakh",tin:"38",stateCode:"LA"},
    {state:"Other Territory",tin:"97",stateCode:"OT"}

]
