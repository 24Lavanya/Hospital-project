const express = require("express");
const router = express.Router(); // Use express.Router() instead of express()

const appoModel = require("../../Models/appointment-model");

router.get("/admin/add-appointment", (req, res) => {
  res.render("../views/frontend/appointment-form.ejs");
});

router.post("/admin/add-appointment", async (req, res) => {
  try {
    await appoModel.create({
      patientName: req.body.patientName,
      doctorname: req.body.doctorname,
      phone: req.body.phone,
      date: req.body.date,
      time: req.body.time,
      message: req.body.message,
    });
    req.flash('success', 'Added successfully');
    res.redirect('/admin/appointment');
  } catch (error) {
    console.log(error);
    req.flash('danger', `Error: ${error}`);
  }
});

router.post("/admin/submit-appointment", async (req, res) => {
  try {
    await appoModel.create({
      patientName: req.body.patientName,
      doctorname: req.body.doctorname,
      phone: req.body.phone,
      date: req.body.date,
      time: req.body.time,
      message: req.body.message,
    });
    req.flash('success', 'Appointment booked!!!');
    res.redirect('/new');
  } catch (error) {
    console.log(error);
    req.flash('danger', `Error: ${error}`);
  }
});

router.get('/admin/appointment', async (req, res) => {
  try {
    const appointments = await appoModel.find().exec();
    const flashMessage = req.flash();
    res.render('../views/frontend/appointment-list.ejs', { appointments, flashMessage });
  } catch (error) {
    console.log(error);
    req.flash('danger', `Error: ${error}`);
    res.redirect('/admin/appointment');
  }
});

// Edit
router.get('/admin/appointment/edit/:id', async (req, res) => {
  const id = req.params.id;
  try {
    const appointment = await appoModel.findById(id).exec();
    if (!appointment) {
      return res.redirect('/admin/appointment');
    }
    res.render('../views/frontend/edit_appointment.ejs', { appointment:appointment });
  } catch (error) {
    console.error(error);
    req.flash('danger', `Error: ${error}`);
    res.redirect('/admin/appointment');
  }
});

router.post('/admin/appointment/edit/:id', async (req, res) => {
  const id = req.params.id;

  try {
    const appointments = await appoModel.findByIdAndUpdate(id, {
      patientName: req.body.patientName,
      doctorname: req.body.doctorname,
      phone: req.body.phone,
      date: req.body.date,
      time: req.body.time,
      message: req.body.message,
    });

    if (!appointments) {
      return res.redirect('/admin/appointment');
    }
    req.flash('success', 'Updated successfully');
    res.redirect('/admin/appointment');
  } catch (error) {
    console.error(error);
    req.flash('danger', `Error: ${error}`);
    res.redirect('/admin/appointment');
  }
});

// Delete
router.get('/admin/appointment/delete/:id', async (req, res) => {
  const id = req.params.id;
  try {
    const appointments = await appoModel.findByIdAndDelete(id);
    if (!appointments) {
      req.flash('danger', 'Appointment not found');
      return res.redirect('/admin/appointment');
    }
    req.flash('success', 'Deleted successfully');
    res.redirect('/admin/appointment');
  } catch (error) {
    console.error(error);
    req.flash('danger', `Error: ${error}`);
    res.redirect('/admin/appointment');
  }
});

module.exports = router;
