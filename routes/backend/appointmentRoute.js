const express = require("express");
const router = express();
// const appoModel = require("../../../Models/appointment-model");

router.get("/admin/add-appointment", (req, res) => {
  // res.send('hi')
  res.render("../views/frontend/appointment-form.ejs");
});

module.exports = router;
