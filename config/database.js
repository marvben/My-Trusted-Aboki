require("dotenv").config();
const mongoose = require("mongoose");

const url = process.env.DB_STRING


main().catch((err) => console.log(err));

async function main() {
  await mongoose.connect(url);
}



// Creates simple schema for a posts.
const customValidation= {type: String, trim: true,required: true};

const postSchema = new mongoose.Schema({
  title: customValidation,
  content: customValidation,
  postType:customValidation, 
  date:Date,
  comments:[{date:Date, postComment:customValidation, username:customValidation}]
});

const Post = mongoose.model("Post", postSchema);

// Expose the connection

module.exports = Post;
