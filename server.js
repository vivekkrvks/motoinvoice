const express = require("express");
const mongoose = require("mongoose");
const bodyparser = require("body-parser");
const passport = require("passport");
const upload = require("express-fileupload");
const cors = require("cors");
const path = require("path");
const cloudinary = require("cloudinary").v2;

require('dotenv/config')

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET
});

const cookieSession = require('cookie-session')

//bring all routes
// Authenitcation
const registration = require("./routes/api/v1/auth/registration");
const login = require("./routes/api/v1/auth/login");
// Addition
const addCompanyProfile = require("./routes/api/v1/profile/addCompanyProfile");
// Profile
const financers = require("./routes/api/v1/addition/small/financers");
// other
const fileUpload = require("./routes/api/v1/other/fileUpload");


//passport 
// const passport = require("./services/passport")
const app = express();
//cookie
app.use(cookieSession({
  maxAge:24*60*60*1000,
  keys:['akjsdfkjk']
}))

//initialise passport
app.use(passport.initialize());
app.use(passport.session());

app.use(upload({ useTempFiles: true }));
app.use(cors());

//Middleware for bodyparser
app.use(bodyparser.urlencoded({ extended: false, limit: "50mb" }));
app.use(bodyparser.json({limit: "50mb"}));
app.use(express.static(path.join(__dirname, "client/build")))


//mongoDB configuration
const db = require("./setup/myurl").mongoURL;

//Attempt to connect to database
mongoose
  .connect(db , { useFindAndModify: false, useNewUrlParser: true , useUnifiedTopology: true} )
  .then(() => console.log(" MongoDB connected successfully"))
  .catch(err => console.log(err));

  //import models
  require("./models/User")

//Passport middleware
app.use(passport.initialize());

//Config for JWT strategy
require("./strategies/jsonwtStrategy")(passport);
require('./services/passport')


//actual routes
// Authentication
app.use("/api/v1/auth/registration", registration);
app.use("/api/v1/auth/login", login);
// Profile 
app.use("/api/v1/profile/addCompanyProfile", addCompanyProfile);
// Addition
app.use("/api/v1/addition/small/financers", financers);
// other
app.use("/api/v1/other/fileUpload", fileUpload);

app.get("/*", function(req, res) {
  res.sendFile(path.join(__dirname, "./client/build/index.html"), function(
    err
  ) {
    if (err) {
      res.status(500).send(err);
    }
  });
});

const port = process.env.PORT || 2040;

app.listen(port, () => console.log(` App is running at ${port}`));

