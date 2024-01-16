const express = require("express");
const router = express.Router();
const doctorModel = require("../../../Models/doctor-model");
const appoModel = require("../../../Models/appointment-model");


router.get("/admin/add-doctor", (req, res) => {
  res.render("../views/frontend/doctor-form.ejs");
});

router.post("/admin/add-doctor", async (req, res) => {
  try {
    const startTimeArray = req.body.startTime;
    const endTimeArray = req.body.endTime;  
    console.log('startTimeArray:', startTimeArray);
    console.log('endTimeArray:', endTimeArray);

    const timeSlots = (startTimeArray && endTimeArray && Array.isArray(startTimeArray) && Array.isArray(endTimeArray))
    ? startTimeArray.map((start, index) => ({ startTime: start, endTime: endTimeArray[index] }))
    : [];
    

    const data=await doctorModel.create({
      doctorname: req.body.doctorName,
      phoneNo: req.body.Mobile,
      department: req.body.dept,
      dob: req.body.dob,
      email: req.body.email,
      istop: req.body.istop === "true",
      exp: req.body.exp,
      education: req.body.education,
      startTime: startTimeArray,
      endTime: endTimeArray,
      slot: timeSlots,
      gender: req.body.gender,
      address: req.body.address,
    });
    console.log(data)
    req.flash("success", "Added successfully");
    res.redirect("/admin/doctor");
  } catch (error) {
    console.log(error);
    req.flash("danger", `Error:${error}`);
  }
});

router.get("/admin/doctor", async (req, res) => {
  try {
    const doctors = await doctorModel.find().exec();
    const flashMessage = req.flash();
    res.render("../views/frontend/doctor-list.ejs", { doctors, flashMessage });
  } catch (error) {
    console.log(error);
    req.flash("danger", `Error:${error}`);
  }
});

router.get("/profile/getTimeSlots", async (req, res) => {
  try {
    //fetches the doctor selected so query is used to get data directly from url
    const doctorName = req.query.doctor;
    // Fetch the doctor based on the provided name
    const doctor = await doctorModel.findOne({ doctorname: doctorName }).exec();

    if (!doctor) {
      // If the doctor is not found, return an empty array or an appropriate response
      return res.json([]);
    }

    // Extract the time slots from the doctor's data
    const timeSlots = doctor.slot.map(slot => `${slot.startTime}-${slot.endTime}`);

    // Return the time slots in JSON format
    res.json(timeSlots);
    console.log(timeSlots)
  } catch (error) {
    console.error("Error fetching time slots:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});
router.get("/profile", async (req, res) => {
  try {
    const doctors = await doctorModel.find().exec();
    const bookedAppos = await appoModel.find().exec();
  
    if (req.isAuthenticated()) {
      //if i dont use this i cant req for username
      const username = req.user.username;  
      res.render("../views/frontend/profile.ejs", {
        doctors,
        username,
        bookedAppos
      });
    }
  } catch (error) {
    console.log(error);
    req.flash("danger", `Error: ${error}`);
    res.redirect("/profile"); // Redirect to handle errors
  }
});



//Doctor UI
router.get("/doc-ui", async (req, res) => {
  try {
    const doctors = await doctorModel.find().exec();
    const appo = await appoModel.find({ status: "Pending" });
    const approved = await appoModel.find().exec();
    console.log(appo);
    
    // console.log(doctors, appo);
    if (req.isAuthenticated()) {
      //if i dont use this i cant req for username
      const username = req.user.username;
      res.render("../views/frontend/doctorui.ejs", { doctors, username, appo,approved });
    }
  } catch (error) {
    console.error(error);
    req.flash("danger", `Error: ${error}`);
  }
});



router.get('/profile/reject/:id', async (req, res) => {
  const id = req.params.id;
  try {
    const appointments = await appoModel.findByIdAndDelete(id);
    if (!appointments) {
      return res.redirect('/profile');
    }
    
    res.redirect('/profile');
  } catch (error) {
    console.error(error);
    req.flash('danger', `Error: ${error}`);
  }
});
router.post("/doc-ui/approve-appointment/:id", async (req, res) => {
  try {
    const appointmentId = req.params.id;

    const appro = await appoModel.findByIdAndUpdate(appointmentId, {
      status: "Approved",
    });
    console.log(appro);
    res.redirect("/doc-ui");
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
});

router.post("/doc-ui/reject-appointment/:id", async (req, res) => {
  try {
    const appointmentId = req.params.id;

    await appoModel.findByIdAndUpdate(appointmentId, { status: "Rejected" });

    res.redirect("/doc-ui");
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
});
//edit

// router.get("/doc-ui/update/:id", async (req, res) => {
//   const id = req.params.id;
//   try {
//     const doctor = await doctorModel.findById(id).exec();
//     console.log('ID:', id);
//     console.log(doctor);
//     if (!doctor) {
//       res.redirect("/doc-ui");
//     }
//     res.render("../views/frontend/update-doc.ejs", {
//       doctor: doctor,  
//     });
//   } catch (error) {
//     console.error(error);
//     req.flash("danger", `Error: ${error}`);
//     // Handle the error appropriately (redirect, render an error page, etc.)
//   }
// });


// router.post("/doc-ui/update/:id", async (req, res) => {
//   const id = req.params.id;

//   try {
//     const doctor = await doctorModel.findByIdAndUpdate(id, {
//       phoneNo: req.body.Mobile,
//       email: req.body.email,
//       exp: req.body.exp,
//       education: req.body.education,
//       slot: req.body.startTime.map((startTime, index) => ({
//         startTime: startTime,
//         endTime: req.body.endTime[index],
//       })),
//       address: req.body.address,
//     });

//     if (!doctor) {
//       return res.redirect("/doc-ui");
//     }
    

//     res.redirect("/doc-ui");
//   } catch (error) {
//     console.error(error);
//     req.flash("danger", `Error:${error}`);
//   }
// });

router.get("/admin/doctor/edit/:id", async (req, res) => {
  const id = req.params.id;
  try {
    const doctor = await doctorModel.findById(id).exec();
    if (!doctor) {
      res.redirect("/admin/doctor");
    }
    res.render("../views/frontend/edit_doctor.ejs", {
      doctor: doctor,
    });
  } catch (error) {
    console.error(error);
    req.flash("danger", `Error:${error}`);
  }
});

router.post("/admin/doctor/edit/:id", async (req, res) => {
  const id = req.params.id;

  try {
    const doctor = await doctorModel.findByIdAndUpdate(id, {
      doctorname: req.body.doctorName,
      department: req.body.dept,
      dob: req.body.dob,
      phoneNo: req.body.Mobile,
      email: req.body.email,
      istop: req.body.istop === "true",
      exp: req.body.exp,
      education: req.body.education,
      slot: req.body.startTime.map((startTime, index) => ({
        startTime: startTime,
        endTime: req.body.endTime[index],
      })),
      gender: req.body.gender,
      address: req.body.address,
    });

    if (!doctor) {
      return res.redirect("/admin/doctor");
    }
    req.flash("success", "Updated successfully");
    // req.session.message = {
    //   message: 'Updated successfully',
    // };

    res.redirect("/admin/doctor");
  } catch (error) {
    console.error(error);
    req.flash("danger", `Error:${error}`);
  }
});

//delete
router.get("/admin/doctor/delete/:id", async (req, res) => {
  var id = req.params.id;
  try {
    const doctor = await doctorModel.findByIdAndDelete(id);
    if (!doctor) {
      res.redirect("/admin/doctor");
    }
    req.flash("success", "Deleted successfully");
    res.redirect("/admin/doctor");
  } catch (error) {
    console.error(error);
    req.flash("danger", `Error:${error}`);
  }
});



    

module.exports = router;