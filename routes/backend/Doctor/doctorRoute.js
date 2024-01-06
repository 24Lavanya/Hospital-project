const express = require("express");
const router = express.Router();
const doctorModel = require("../../../Models/doctor-model");
const appoModel=require('../../../Models/appointment-model')
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
        istop: req.body.istop==='true',
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
    const bookedAppos = await appoModel.find().exec();
    // console.log("Doctors data:", doctors);
    if (req.isAuthenticated()) {         //if i dont use this i cant req for username
      const username = req.user.username;
      res.render('../views/frontend/profile.ejs', { doctors,username,bookedAppos });
    }
    
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
    const appo = await appoModel.find({ status: 'Pending' });
    // var appo = await appoModel.find({ status: 'Approved' }).exec();
    console.log(appo)
    // console.log(doctors, appo);
    if (req.isAuthenticated()) {         //if i dont use this i cant req for username
      const username = req.user.username;
      res.render('../views/frontend/doctorui.ejs', { doctors, username,appo });
    }
  } catch (error) {
    console.error(error);
    req.flash('danger', `Error: ${error}`);
  }
});


router.post('/doc-ui/approve-appointment/:id', async (req, res) => {
  try {
    const appointmentId = req.params.id;
    
    const appro = await appoModel.findByIdAndUpdate(appointmentId, { status: 'Approved' });
    console.log(appro)
    res.redirect('/doc-ui');
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
});

router.post('/doc-ui/reject-appointment/:id', async (req, res) => {
  try {
    const appointmentId = req.params.id;

    await appoModel.findByIdAndUpdate(appointmentId, { status: 'Rejected' });

    res.redirect('/doc-ui');
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
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
      istop: req.body.istop==='true',
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
