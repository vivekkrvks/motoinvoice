const express = require("express");
const router = express.Router();
const passport = require("passport");

//Load Financers.js Model
const Financers = require("../../../../../models/Addition/Financers");

// @type    POST
//@route    /api/v1/addition/small/financers/
// @desc    route for SAVING data for financers
// @access  PRIVATE
router.post(
  "/",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
   
    const financersValues = {
      
    };
    financersValues.user = req.user.id;
    financersValues.financerName = req.body.financerName;
    financersValues.createdAt = Date.now();
    financersValues.designation = req.user.designation;
    financersValues.cGstNo = req.user.companyGstNo;
//link start

    var strs = req.body.financerName;
    var rests = strs.replace(/  | |   |    |      /gi, function (x) {
      return  "";
    });
    financersValues.link = rests.toLowerCase()
// link end

    //Do database stuff
if(
  req.body.financerName == undefined || req.body.financerName == "" 

){

  res.json({
    message: "financerName are Required field",
    variant: "error"
})

  
    } else {
    
          Financers.findOne({
            financerName: financersValues.financerName
          })
            .then(financers => {
              //Username already exists
              if (financers) {
                res.json({
                  message: "financerName Already exist ",
                  variant: "error"
                });
              } else {
                new Financers(financersValues)
                .save()
                .then(
                  res.json({
                    message: "Successfully saved",
                    variant: "success"
                  })
                )
                .catch(err => console.log(err));
              }
            })
            .catch(err => console.log(err));    

    }
    }
);

// @type    GET
//@route    /api/v1/addition/small/financers/allfinancers
// @desc    route for getting all data from  financers
// @access  PRIVATE
router.get(
  "/allfinancers", 
  (req, res) => {
    Financers.find({})
      .sort({ date: -1 })
      .then(Financers => res.json(Financers))
      .catch(err =>
        res
          .status(404)
          .json({ message: "No Financers Found", variant: "error" })
      );
  }
);

// @type    get
//@route    /api/v1/addition/small/financers/get/:id
// @desc    route to get single financers by id
// @access  PRIVATE
router.get(
  "/get/:id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Financers.findOne({
      _id: req.params.id
    }).then(Financers => res.json(Financers)).catch(err => res.json({message: "Problem in finding With this Id", variant: "error"}));
  }
);

// @type    POST
//@route    /api/v1/addition/small/financers/:id
// @desc    route to update/edit financers
// @access  PRIVATE
async function updateMe(req,res,financersValues){

  Financers.findOneAndUpdate(
    { _id: req.params.id },
    { $set: financersValues },
    { new: true }
  )
    .then(financers => {
      if (financers){
        res.json({ message: "Updated successfully!!", variant: "success" })

      } else {
        res.json({ message: "Id not found", variant: "error" })

      }
    }        
    )

    .catch(err =>
      console.log("Problem in updating financers value" + err)
    );




}

router.post(
  "/:id",
  passport.authenticate("jwt", { session: false }),
  async(req, res) => {
    const financersValues = {
      
    };
    financersValues.user = req.user.id;
    financersValues.financerName = req.body.financerName;
    financersValues.createdAt = Date.now();
    financersValues.designation = req.user.designation;
    financersValues.cGstNo = req.user.companyGstNo;
//link start

    var strs = req.body.financerName;
    var rests = strs.replace(/  | |   |    |      /gi, function (x) {
      return  "";
    });
    financersValues.link = rests.toLowerCase()
// link end

    //Do database stuff
if(
  req.body.financerName == undefined || req.body.financerName == "" 

){

  res.json({
    message: "financerName are Required field",
    variant: "error"
})

  
    } else {
    
          Financers.findOne({
            financerName: financersValues.financerName
          })
            .then(financers => {
              //Username already exists
              if (financers) {
                res.json({
                  message: "financerName Already exist ",
                  variant: "error"
                });
              } else {
                updateMe(req,res,financersValues)
              }
            })
            .catch(err => console.log(err));    

    }
}
);


// @type    GET
//@route    /api/v1/addition/small/financers/allfinancers/:searchfinancers
// @desc    route for searching of financers from searchbox using any text
// @access  PRIVATE
router.get(
  "/allfinancers/:searchfinancers",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const search = req.params.searchfinancers;
    if (isNaN(search)) {
      Financers.find({
        financerName: new RegExp(search, "i")
      }).then(Financers => res.json(Financers)).catch(err => res.json({message: "Problem in Searching" + err, variant: "success"}));
    } 
  }
);


module.exports = router;
