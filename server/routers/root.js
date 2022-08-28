const express = require ('express');
const router = express.Router();
const path = require('path');

router.get('^/$|/index(.html)?', (req,res) => {
    res.sendFile(path.join(__dirname,'..','views', 'index.html'))
})
module.exports = router

/*  
app.get('/old-page(.html)?', (req,res) =>{
    res.redirect(301, '/index.html'); // 302 by default
})
 */