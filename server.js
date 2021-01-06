require("dotenv").config();
const express = require("express");
const app = express();
const ejs = require("ejs");
const body=require("body-parser");
const ejsexpress = require("express-ejs-layouts");
const path = require("path");
const mongoose = require("mongoose");
var session = require("express-session");
var flash = require("express-flash");
const { MongoStore } = require("connect-mongo");
const bodyParser = require("body-parser");
var MONGODBSTORE = require("connect-mongo")(session);
var Passport=require('passport');
const passport = require("passport");


//assests
//database
const uri = "mongodb://localhost:27017/pizza";
const connection=mongoose.connection;
//

// Prints "MongoError: bad auth Authentication failed."
mongoose.connect(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});





app.use(flash());
//session store
let mongoStore=new MONGODBSTORE({
  mongooseConnection: connection,
  collection: "session",
});
//session config
app.use(
  session({
    secret: process.env.COOKIE_SECRET,
    resave: false,
    store:mongoStore,
    saveUninitialized: false,
    cookie: { maxAge: 1000 * 50},
  })
);

//passport

const passportInit=require('./app/config/passport')
passportInit(Passport)
app.use(passport.initialize())
app.use(passport.session())

//for parsing the body data which is url encoded
app.use(body.urlencoded({ extended: false }));

app.use(body.json())
// global session
app.use((req,res,next)=>{
  res.locals.session=req.session;
  res.locals.user=req.user;
  console.log(req.user);
  next()
})
//set template engine
app.use(ejsexpress);
app.set("views", path.join(__dirname, "/resources/views"));

app.set("view engine", "ejs");

app.use(express.static("public"));

require("./routes/web")(app);

app.listen(80, () => {
  console.log("its working");
});
