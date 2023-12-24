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
        exp: req.body.exp,
        gender: req.body.gender,
        address: req.body.address,
      })
      req.flash('success', 'Added successfully');
      res.redirect('/admin/doctor');
  } catch (error) {
    console.log(error);
     req.flash('danger', `Error:${error}`);
  }
});

router.get("/admin/doctor", async (req, res) => {
  try {
    const doctors = await doctorModel.find().exec();
    const flashMessage = req.flash();
    res.render('../views/frontend/doctor-list.ejs', {  doctors, flashMessage });
    
  } catch (error) {
    console.log(error);
     req.flash('danger', `Error:${error}`);
  }
});


router.get("/profile", async (req, res) => {
  try {
    const doctors = await doctorModel.find().exec();
    // console.log("Doctors data:", doctors);
    res.render('../views/frontend/profile.ejs', { doctors:doctors });
  } catch (error) {
    console.log(error);
    req.flash('danger', `Error: ${error}`);
    res.redirect('/profile'); // Redirect to handle errors
  }
});

// Route handler
router.get("/doc-ui", async (req, res) => {
  try {
    const doctors = await doctorModel.find().exec();
    // console.log('Doctors:', doctors);
    res.render('../views/frontend/doctorui.ejs', { doctors: doctors });
  } catch (error) {
    console.error(error);
    req.flash('danger', `Error: ${error}`);
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
    req.flash('danger', `Error:${error}`);
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
      exp: req.body.exp,
      gender: req.body.gender,
      address: req.body.address,
    });

    if (!doctor) {
      return res.redirect('/admin/doctor')
    }
    req.flash('success', 'Updated successfully');
    // req.session.message = {
    //   message: 'Updated successfully',
    // };

    res.redirect('/admin/doctor');
  } catch (error) {
    console.error(error);
    req.flash('danger', `Error:${error}`);
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
    req.flash('success', 'Deleted successfully');
    res.redirect('/admin/doctor')
  } catch (error) {
    console.error(error);
    req.flash('danger', `Error:${error}`);
  }
})



module.exports = router;
