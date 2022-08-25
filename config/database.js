require("dotenv").config();
const mongoose = require("mongoose");

const url = process.env.DB_STRING


main().catch((err) => console.log(err));

async function main() {
  await mongoose.connect(url);
}



// Creates simple schema for a posts.
const postSchema = new mongoose.Schema({
  username: String,
  post: String,
  postType:String,
  date:Date,
  comments:[]
});

const Post = mongoose.model("Post", postSchema);

// Expose the connection

module.exports = Post;
