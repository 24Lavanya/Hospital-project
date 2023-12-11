const express = require("express");
const router = express();
// const appoModel = require("./Models/appointment-model");

router.get("/", (req, res) => {
  res.render("../views/frontend/appointment-list.ejs");
});

module.exports = router;