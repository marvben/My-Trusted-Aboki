const router = require('express').Router();
const ejs = require('ejs');
 const posts = require('../config/database.js');



/**
 * -------------- POST ROUTES ----------------
 */

router.post("/", (req,res) => {
    const postTime = new Date().toLocaleString("en-US");
    posts.create({ username:req.body.username, post:req.body.content,postType:req.body.picker, date:postTime}, (err)=>{
        if(!err){
            res.redirect("/")
        }else{
            console.log(err)
            res.redirect("/")
        }
    })
})

router.post("/comment", (req,res) => {
    const commentTime = new Date().toLocaleString("en-US");

    posts.findOneAndUpdate(
        { _id: req.body.postID }, 
        { $push: { comments: {date: commentTime, postComment:req.body.comment} } },
        function (error, item) {
            if (error) {
                console.log(error);
            } else {
                console.log("success", item);
            }
            res.redirect("/")
        }
    );


//     posts.findById(req.body.postID, (err, foundPost)=>{
//         if(!err){
//             console.log(foundPost.comments.push(req.body.comment))
//             res.redirect("/")
//        }
//    })
 

})

 // TODO
 router.post('/login', (req, res, next) => {});

 // TODO
 router.post('/register', (req, res, next) => {});


 /**
 * -------------- GET ROUTES ----------------
 */

router.get('/', (req, res) => {
    posts.find({}).sort('date').exec((err, posts)=>{
        if(!err){
            res.render('home', {posts:posts});
       }
   })
   
   
});




module.exports = router;