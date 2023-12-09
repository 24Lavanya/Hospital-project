const express = require("express");
const router = express.Router();
const doctorModel = require("../../../Models/doctor-model");

router.get("/admin/add-doctor", (req, res) => {
  res.render("../views/frontend/doctor-form.ejs");
});

router.post("/admin/add-doctor", async(req, res) => {
  try {
    await doctorModel
      .create({
        doctorname: req.body.doctorName,
        phoneNo: req.body.Mobile,
        department: req.body.dept,
        dob: req.body.dob,
        email: req.body.email,
        gender: req.body.gender,
        address: req.body.address,
      })
      res.redirect('/admin/doctor');
  } catch (error) {
    console.log(error);
    res.status(500).send("Internal Server Error");
  }
});

router.get("/admin/doctor", async (req, res) => {
  try {
    const doctors = await doctorModel.find().exec();
    res.render('../views/frontend/doctor-list.ejs', { doctors: doctors });
  } catch (error) {
    console.log(error);
    res.status(500).send("Internal Server Error");
  }
});

//edit
router.get('/admin/doctor/edit/:id',async (req, res) => {
  const id = req.params.id;
  try {
    const doctor = await doctorModel.findById(id).exec();
    if (!doctor) {
      res.redirect('/admin/doctor');
    }
    res.render('../views/frontend/edit_doctor.ejs', {
      doctor : doctor ,
    });
  } catch (error) {
    console.error(error);
    res.status(500).send(`Internal Server Error: ${error.message}`);
  }
})

router.post('/admin/doctor/edit/:id', async (req, res) => {
  const id = req.params.id;

  try {
    const doctor = await doctorModel.findByIdAndUpdate(id, {
      doctorname: req.body.doctorName,
      department: req.body.dept,
      dob: req.body.dob,
      phoneNo: req.body.Mobile,
      email: req.body.email,
      gender: req.body.gender,
      address: req.body.address,
    });

    if (!doctor) {
      return res.redirect('/admin/doctor')
    }

    // req.session.message = {
    //   message: 'Updated successfully',
    // };

    res.redirect('/admin/doctor');
  } catch (error) {
    console.error(error);
    res.status(500).send(`Internal Server Error:${error}`);
  }
});

//delete
router.get('/admin/doctor/delete/:id', async (req, res) => {
  var id = req.params.id;
  try {
    const doctor = await doctorModel.findByIdAndDelete(id);
    if (!doctor) {
      res.redirect('/admin/doctor')
    }
    res.redirect('/admin/doctor')
  } catch (error) {
    console.error(error);
    res.status(500).send(`Internal Server Error:${error}`);
  }
})


module.exports = router;
