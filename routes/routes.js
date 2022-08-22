const router = require('express').Router();
const ejs = require('ejs');
 const data = require('../config/database.js');



/**
 * -------------- POST ROUTES ----------------
 */

 // TODO
 router.post('/login', (req, res, next) => {});

 // TODO
 router.post('/register', (req, res, next) => {});


 /**
 * -------------- GET ROUTES ----------------
 */

router.get('/', (req, res) => {
    data.find({}, (err, items)=>{
        if(!err){
            res.render('home', {data:items});
       }
   })
   
   
});




module.exports = router;