var express = require('express');
var router = express.Router();
const userModel=require("./users");
const passport = require('passport');
const localStrategy = require("passport-local");
passport.use(new localStrategy(userModel.authenticate()));

let adminroute = require('./admin');
router.use('',adminroute)


router.get('/login', function (req, res, next) {
  res.render('../views/frontend/login.ejs',{error:req.flash("error")});
});
router.get('/register', function(req, res, next) {
  res.render('../views/frontend/create.ejs');
});
router.get('/profile', isLoggedIn, function(req, res, next) {
  res.render('../views/frontend/profile.ejs');
});

router.get('/doc-ui', (req, res) => {
  res.render('../views/frontend/doctorui.ejs')
})
router.post("/register", function (req, res) {
  const { username,email,role } = req.body;
  const userData = new userModel({ username, email, role });
  userModel.register(userData, req.body.password)
    .then(function () {
      passport.authenticate("local")(req, res, function () {
        console.log(userData)
        res.redirect("/login");
    })
  })
})


router.post("/login", passport.authenticate("local", {
  failureRedirect: "/login",
  failureFlash:true
}),
function(req, res) {
  if (!req.isAuthenticated()) {
    return res.redirect("/register");
  }
  const { role } = req.user;  ///user because i am requesting which is already there
  console.log(role)
  if (role==='doctor') {
    res.redirect('/doc-ui');
  } else if (role==='user') {
    res.redirect('/profile');
  } else {
    res.redirect('/admin');
  }
});

router.get('/logout', (req, res) => {
  req.logout((err)=> {
    if (err) {
      return next(err)
  }
  res.redirect('/login')
  })
})
function isLoggedIn(req, res, next) {
  if (req.isAuthenticated()) return next();
  res.redirect("/login");
}
module.exports = router;
