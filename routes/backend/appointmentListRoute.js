const express = require("express");
const router = express();
// const appoModel = require("./Models/appointment-model");

router.get("/admin/appointment", (req, res) => {
//   res.send('hi')
  res.render("../views/frontend/appointment-list.ejs");
});

module.exports = router;