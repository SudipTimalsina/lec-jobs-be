const express = require("express");
const fs = require("fs");
const cors = require("cors");
const mongoose = require("mongoose");

const app = express();

app.use(cors());

const PORT = 5000;

const mongoDbURI = "mongodb://localhost:27017/lec";
mongoose.connect(mongoDbURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const userSchema = new mongoose.Schema({
  email: String,
  username: String,
  fullname: String,
  title: String,
  skills: [{ type: String }],
  address: String,
  job_type: String,
  id: Number,
  is_active: Boolean,
  followers: [{ type: String }],
  followings: [{ type: String }],
});

const User = mongoose.model("User", userSchema);
User.createCollection()
  .then((col) => {
    console.log("Collection", col, "Created");
  })
  .catch((err) => {
    console.log(err);
  });
User.create({
  email: "test@test.com",
  username: "sudip",
  fullname: "Sudip Timalsina",
  title: "Software Developer",
  skills: ["JS", "PHP", "JAVA"],
  address: "Kathmandu, Nepal",
  job_type: "Full Time",
  id: 1,
  is_active: true,
  followers: ["username123", "user234", "user543"],
  followings: ["username123", "user234", "user543", "user555"],
}).then(()=>{
    console.log("User Created");
});

app.get("/", (req, res) => {
  res.status(200).send("This is response from BE");
});

app.get("/api/v1/posts", (req, res) => {
  const posts = fs.readFileSync("./data/posts.json", "utf-8").toString();
  res.status(200).send(posts);
});

app.get("/api/v1/user", (req, res) => {
  const user = fs.readFileSync("./data/user.json", "utf-8").toString();
  res.status(200).send(user);
});

app.listen(PORT, () => {
  console.log("App is Running on port " + PORT);
});
