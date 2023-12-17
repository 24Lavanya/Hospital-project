require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const app = express();
const bodyParser = require('body-parser');
var createError = require('http-errors');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const expressSession = require('express-session');
const passport = require('passport');
const { request } = require('https');
const flash = require('connect-flash');
const flashe = require('express-flash');
const doctorModel = require('./Models/doctor-model');

const port = process.env.PORT || 3000;
mongoose
  .connect(
    process.env.MONGODB_URL
  )
  .then((response) => console.log("Connected to database"))
  .catch((error) => console.log(error));


app.set("view engine", "ejs");
app.use(express.static(__dirname + "/public/"));
app.set(express.static(__dirname,+ '/views/'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.urlencoded({ extended: false }))
app.use(express.json())

//session middleware
app.use(expressSession({
  resave: false,
  saveUninitialized: false,
  secret:'hey hey hey'
}))
//passport
app.use(passport.initialize());
app.use(passport.session());

app.use(flash());
app.use(flashe())
app.use((req, res, next) => {
  res.locals.message = req.flash('message');
  next();
})
// app.use((req, res, next) => {
//   res.locals.messages = require('express-messages')(req, res);
//   next();
// });


var indexRouter = require('./routes/backend/login');
var usersRouter = require('./routes/backend/users');










app.get("/", (req, res) => {
  res.render('./frontend/login.ejs');
});

//admin
let admin = require("./routes/backend/admin");
let dept = require("./routes/backend/Department/departmentlistRoute");
let addDept = require("./routes/backend/Department/departmentRoute");
//doctor
let doc = require("./routes/backend/Doctor/doctorlistRoute");
let addDoc = require("./routes/backend/Doctor/doctorRoute");
//patient
let pat = require("./routes/backend/Patient/patientlistRoute");
let addPat = require("./routes/backend/Patient/patientRoute");

let appo = require('./routes/backend/appointmentListRoute');
let addAppo = require("./routes/backend/appointmentRoute");

app.use("", admin);

app.use("", dept);
app.use("", addDept);

app.use("", doc);
app.use("", addDoc);

app.use("", pat);
app.use("", addPat);

app.use("", appo);
app.use("", addAppo);


//admin ends

passport.serializeUser(usersRouter.serializeUser());
passport.deserializeUser(usersRouter.deserializeUser());

app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('./backend/users.js', usersRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
// app.use(function(err, req, res, next) {
//   // set locals, only providing error in development
//   res.locals.message = err.message;
//   res.locals.error = req.app.get('env') === 'development' ? err : {err};

//   // render the error page
//   res.status(err.status || 500);
//   res.render('error');
// });

app.use(function(err, req, res, next) {
  res.locals.message = req.flash('error') || 'Internal Server Error';
  res.locals.error = req.app.get('env') === 'development' ? err : {};
  res.status(err.status || 500);
  res.render('error');
});

app.listen(port, console.log("Listening"));

module.exports = app;
