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
mongoose
  .connect(
    process.env.MONGODB_URL
  )
  .then((response) => console.log("Connected to database"))
  .catch((error) => console.log(error));

var indexRouter = require('./routes/backend/login');
var usersRouter = require('./routes/backend/users');

//login
const passport = require('passport');
const { request } = require('https');

app.set("view engine", "ejs");
app.use(express.static(__dirname + "/public/"));
app.set(express.static(__dirname,+ '/views/'));
app.use(bodyParser.urlencoded({ extended: true }));


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
app.get('/new', (req, res) => {
  res.render('../views/frontend/new.ejs')
})
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

app.use(expressSession({
  resave: false,
  saveUninitialized: false,
  secret:'hey hey hey'
}))

app.use(passport.initialize());
app.use(passport.session());
passport.serializeUser(usersRouter.serializeUser());
passport.deserializeUser(usersRouter.deserializeUser());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('./backend/users.js', usersRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

app.listen(3000, console.log("Listening"));

module.exports = app;
