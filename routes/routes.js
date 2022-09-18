const router = require("express").Router();
const ejs = require("ejs");
const posts = require("../config/database.js");
require("dotenv").config();
const nodemailer = require("nodemailer");
const quote = require("inspirational-quotes");

/**
 * -------------- POST ROUTES ----------------
 */

router.post("/newPost", (req, res) => {
  const postTime = new Date().toLocaleString("en-US");
  posts.insertMany(
    {
      title: req.body.title,
      content: req.body.content,
      postType: req.body.picker,
      date: postTime,
    },
    (err) => {
      if (!err) {
        res.redirect("/");
      } else {
        console.log(err);
        res.redirect("/");
      }
    }
  );
});

router.post("/editPost", (req, res) => {
  const postTime = new Date().toLocaleString("en-US");
  posts.findByIdAndUpdate(
    req.body.postId,
    {
      title: req.body.postTitle,
      content: req.body.postBody,
      postType: req.body.picker,
      date: postTime,
    },
    (err, updatedPost) => {
      if (!err) {
        console.log("UPDATED THIS POST: ", updatedPost.title);
        res.redirect("/" + req.body.postTitle + "/" + req.body.postId);
      } else {
        console.log(err);
        res.redirect("/");
      }
    }
  );
});

router.post("/comment", (req, res) => {
  const commentTime = new Date().toLocaleString("en-US");
  posts.findOneAndUpdate(
    { _id: req.body.commentId },
    {
      $push: {
        comments: {
          date: commentTime,
          postComment: req.body.comment,
          username: req.body.usernameOfCommentor,
        },
      },
    },
    function (error, item) {
      if (error) {
        console.log(error);
      } else {
        console.log("success", item);
      }
      res.redirect("/");
    }
  );
});

//post request for contact form sending email
router.post("/contactForm", (req, res) => {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL_STRING,
      pass: process.env.EMAIL_PASSWORD,
    },
  });

  const mailOptions = {
    from: process.env.EMAIL_STRING,
    to: "benluvforu@gmail.com",
    subject: "Message from Trusted Aboki",
    html: `<h1>Message from ${req.body.name}</h1>
            <p>Email: ${req.body.email}</p>
            <p>Name: ${req.body.name}</p>
            <p>Tel: ${req.body.tel}</p>
            <p>Message: ${req.body.content}</p>
            <p>${new Date().toLocaleString()}</p>`,
    // attachments: [{
    //     filename: req.body.file,
    //     path: `${req.body.file}config.json`
    // }]
  };

  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      console.log(error);
      res.render("emailFailure", { senderName: req.body.name });
    } else {
      console.log("Email sent: " + info.response);
      res.render("emailSuccess", { senderName: req.body.name });
    }
  });
});

// TODO
router.post("/login", (req, res, next) => {});

// TODO
router.post("/register", (req, res, next) => {});

/**
 * -------------- GET ROUTES ----------------
 */

router.get("/", (req, res) => {
  const todayQuote = quote.getQuote();
  console.log(todayQuote);
  posts.find({}, (err, posts) => {
    if (!err) {
      res.render("home", { posts: posts, todayQuote: todayQuote });
    }
  });
});

router.get("/:postTitle/:postId", (req, res) => {
  posts.findById(req.params.postId, (err, foundPost) => {
    if (!err) {
      res.render("post", { foundPost: foundPost });
    }
  });
});

router.get("/newPost", (req, res) => {
  res.render("newPost");
});

router.get("/contact", (req, res) => {
  res.render("contact");
});

module.exports = router;
