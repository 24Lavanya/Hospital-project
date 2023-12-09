const express = require("express");
const patientModel = require("../../../Models/patient-model");
const router = express();


router.get("/admin/add-patient", (req, res) => {
  res.render('../views/frontend/patient-form.ejs')
});




router.post("/admin/add-patient", async (req, res) => {
  try {
    await patientModel.create({
      patientname: req.body.patientName,
      bloodGroup: req.body.bloodGroup,
      dob: req.body.dob,
      phoneNo: req.body.contactNumber,
      email: req.body.email,
      gender: req.body.gender,
      address: req.body.address,
    });
    res.redirect('/admin/patient');
  } catch (error) {
    console.log(error);
    res.status(500).send("Internal Server Error");
  }
});
router.get("/admin/patient", async (req, res) => {
  try {
    const patients = await patientModel.find().exec();
    res.render('../views/frontend/patient-list.ejs', { patients: patients });
  } catch (error) {
    console.log(error);
    res.status(500).send("Internal Server Error");
  }
});

// edit
router.get('/admin/patient/edit/:id', async (req, res) => {
  const id = req.params.id;
  try {
    
    const patient = await patientModel.findById(id).exec();

    if (!patient) {
      return res.redirect('/admin/patient');
    }

    res.render('../views/frontend/edit_patient.ejs', {
      patient: patient,
    });
  } catch (error) {
    console.error(error);
    res.status(500).send(`Internal Server Error: ${error.message}`);
  }
});

router.post('/admin/patient/edit/:id', async (req, res) => {
  const id = req.params.id;

  try {
    const patient = await patientModel.findByIdAndUpdate(id, {
      patientname: req.body.patientName,
      bloodGroup: req.body.bloodGroup,
      dob: req.body.dob,
      phoneNo: req.body.contactNumber,
      email: req.body.email,
      gender: req.body.gender,
      address: req.body.address,
    });

    if (!patient) {
      res.redirect('/admin/patient')
    }

    // req.session.message = {
    //   message: 'Updated successfully',
    // };

    res.redirect('/admin/patient');
  } catch (error) {
    console.error(error);
    res.status(500).send(`Internal Server Error:${error}`);
  }
});

//delete
router.get('/admin/patient/delete/:id', async (req, res) => {
  var id = req.params.id;
  try {
    const patient = await patientModel.findByIdAndDelete(id);
    if (!patient) {
      res.redirect('/admin/patient')
    }
    res.redirect('/admin/patient')
  } catch (error) {
    console.error(error);
    res.status(500).send(`Internal Server Error:${error}`);
  }
})

module.exports = router;
