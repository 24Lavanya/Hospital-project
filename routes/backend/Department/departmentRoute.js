const express = require("express");
const router = express();
const deptModel = require("../../../Models/department-model");

router.get("/admin/add-dept", (req, res) => {
  // res.send('hi')
  res.render("../views/frontend/department-form.ejs");
});

router.post("/admin/add-dept", async (req, res) => {
  try {
    await deptModel.create({
      deptname: req.body.department_name,
      hod: req.body.head_of_department,
      description: req.body.description,
    });
      res.redirect('/admin/dept')
  } catch (error) {
    console.log(error);
    res.status(500).send("Internal Server Error");
  }
});

router.get("/admin/dept", async(req, res) => {
   try {
       const dept = await deptModel.find().exec();
       res.render('../views/frontend/department-list.ejs',{dept:dept})
   } catch (error) {
    console.log(error);
    res.status(500).send("Internal Server Error");
   }
});
  
//edit
router.get('/admin/dept/edit/:id',async (req, res) => {
  const id = req.params.id;
  try {
    const depts = await deptModel.findById(id).exec();
    if (!depts) {
      res.redirect('/admin/dept')
    }
    res.render('../views/frontend/edit_dept.ejs', {
      depts:depts,
    })
  } catch (error) {
    console.error(error);
    res.status(500).send(`Internal Server Error:${error}`);
  }
})

router.post('/admin/dept/edit/:id', async (req, res) => {
  const id = req.params.id;
  try {
    const depts = await deptModel.findByIdAndUpdate(id, {
      deptname: req.body.department_name,
      hod: req.body.head_of_department,
      description: req.body.description,
    })
    if (!depts) {
      res.redirect('/admin/dept')
    }
    res.redirect('/admin/dept')
  } catch (error) {
    console.error(error);
    res.status(500).send(`Internal Server Error:${error}`);
  }
})

//delete

router.get('/admin/dept/delete/:id', async (req, res) => {
  const id = req.params.id;
  try {
    const depts = await deptModel.findByIdAndDelete(id);
    if (!depts) {
     return res.redirect('/admin/dept')
    }
    res.redirect('/admin/dept')
  } catch (error) {
    console.error(error);
    res.status(500).send(`Internal Server Error:${error}`);
  }
})
module.exports = router;
