const express = require('express');
const router = express();


router.get('/admin',(req, res)=> {
    res.render('../views/frontend/admin-file.ejs')
})

module.exports = router;