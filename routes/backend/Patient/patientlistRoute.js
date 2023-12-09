const express = require('express');
const router = express();


router.get('/', (req, res) => {
    res.render('../views/frontend/patient-list.ejs');
});

module.exports = router;
