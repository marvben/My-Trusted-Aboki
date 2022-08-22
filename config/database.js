require("dotenv").config();
const mongoose = require("mongoose");

const url = process.env.DB_STRING

console.log(url);

main().catch((err) => console.log(err));

async function main() {
  await mongoose.connect(url);
}

// Creates simple schema for a User.
const UserSchema = new mongoose.Schema({
  username: String,
  password: String,
});

const User = mongoose.model("User", UserSchema);

User.create({ username: "Benjamin", password: "Nwabunwann" }, function (err) {
  if (err) {
    console.log(err);
  } else {
    console.log("Saved");
  }
});

// Expose the connection

module.exports = User;
