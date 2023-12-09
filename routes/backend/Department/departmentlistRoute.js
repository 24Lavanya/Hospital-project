const express = require('express');
const router = express();



router.get('/', (req, res) => {
    // res.send('hi')
    res.render('../views/frontend/department-list.ejs');
});


module.exports = router;
