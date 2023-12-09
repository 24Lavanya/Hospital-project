function setFormAction(action) {
    document.getElementById('addDepartmentForm').action = action;
    document.getElementById('addDoctorForm').action = action;
    document.getElementById('addPatientForm').action = action;
  }
  
  function showForm(formId) {
    // Hide all forms in the section
    var forms = document.getElementsByClassName("form-container");
    for (var i = 0; i < forms.length; i++) {
        forms[i].classList.remove("active");
    }
  
    // Show the selected form
    document.getElementById(formId + "-form").classList.add("active");
  }
  function showFormOfForm(formId1) {
    // Hide all forms
    var form = document.getElementsByClassName("form");
  
    for (var i = 0; i < form.length; i++) {
        form[i].classList.remove('active-active');
    }
    document.getElementById(formId1 + "-form").classList.add('active-active');
  }
  function showFormOfForm2(formId2) {
    // Hide all forms
    var form = document.getElementsByClassName("form2");
  
    for (var i = 0; i < form.length; i++) {
        form[i].classList.remove('active-active');
    }
    document.getElementById(formId2 + "-form").classList.add('active-active');
  }
  function showFormOfForm3(formId3) {
    // Hide all forms
    var form = document.getElementsByClassName("form3");
  
    for (var i = 0; i < form.length; i++) {
        form[i].classList.remove('active-active');
    }
    document.getElementById(formId3 + "-form").classList.add('active-active');
  }