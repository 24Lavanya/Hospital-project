var express = require('express');
var router = express.Router();
const userModel=require("./users");
const passport = require('passport');
const localStrategy = require("passport-local");
passport.use(new localStrategy(userModel.authenticate()));

let adminroute = require('./admin');
router.use('',adminroute)

router.get('/create', function(req, res, next) {
  res.render('../views/frontend/create.ejs');
});


router.get('/log', function(req, res, next) {
  res.render('../views/frontend/login.ejs');
});
router.get('/new', isLoggedIn, function(req, res, next) {
  res.render('../views/frontend/new.ejs');
});
 
router.post("/register", function (req, res) {
  const { username,email } = req.body;
  const userData = new userModel({username,email});
  userModel.register(userData, req.body.password)
    .then(function () {
      passport.authenticate("local")(req, res, function () {
        res.redirect("/new");
    })
  })
})


router.post("/login", passport.authenticate("local", {
  failureRedirect: "/create"
}),
  function async(req, res) {
    const { username } = req.body;
    if (username.toLowerCase() === 'admin') {
      res.redirect("/admin");
    } else {
      res.redirect("/new");
    }
  });
router.get("/logout", function (req, res) {
  req.logout(function (err) {
    if (err) { return next(err); }
    res.redirect('/');
  })
})


function isLoggedIn(req, res, next) {
  if (req.isAuthenticated()) return next();
  res.redirect("/");
}
module.exports = router;
