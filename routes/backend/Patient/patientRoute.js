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
      req.flash('success', 'Added successfully');
      res.redirect('/admin/patient');
    } catch (error) {
      console.log(error);
      req.flash('danger', `Error:${error}`);
    }
  });
  router.get("/admin/patient", async (req, res) => {
    try {
      const patients = await patientModel.find().exec();
      const flashMessage = req.flash();
      res.render('../views/frontend/patient-list.ejs', { patients: patients, flashMessage  });
    } catch (error) {
      console.log(error);
      req.flash('danger', `Error:${error}`);
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
      req.flash('danger', `Error:${error}`);
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
      
      req.flash('success', 'Updated successfully');
      // req.session.message = {
      //   message: 'Updated successfully',
      // };

      res.redirect('/admin/patient');
    } catch (error) {
      console.error(error);
      req.flash('danger', `Error:${error}`);
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
      req.flash('success', 'Deleted successfully');
      res.redirect('/admin/patient')
    } catch (error) {
      console.error(error);
      req.flash('danger', `Error:${error}`);
    }
  })

  module.exports = router;
