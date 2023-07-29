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


// trying out to do the same for the post section
const postSchema = new mongoose.Schema({
  title: String,
  description: String,
  location: String,
  job_type: String,
  pay_rate_per_hr_dollar: Number,
  skills: [{ type: String }],
  liked_by: [{ type: String }],
  viewed_by: [{ type: String }],
  id: Number,
  user_id: Number,
  post_by_username: String,
  post_by_fullname: String,
  post_date: String,
  comments: [{ type: String }],
});
const Post = mongoose.model("Post", postSchema);
User.createCollection()
  .then((col) => {
    console.log("Collection", col, "Created");
  })
  .catch((err) => {
    console.log(err);
  });
// Post.create({
//   title: "Python Developer Required",
//   description: "For a client project Python Developer is required",
//   location: "Lalitpur",
//   job_type: "Full Time",
//   pay_rate_per_hr_dollar: 25.0,
//   skills: ["Python", "JS", "HTML"],
//   liked_by: ["test111", "test1", "test122"],
//   viewed_by: ["test111", "test1", "test123"],
//   id: 2,
//   user_id: 1,
//   post_by_username: "Sudip",
//   post_by_fullname: "Sudip Timalsina",
//   post_date: "2023-06-10T09:24:07.659034",
//   comments: [],
// }).then(() => {
//   console.log("Poster Detail is Created");
// });







app.get("/", (req, res) => {
  res.status(200).send("This is response from BE");
});

app.get("/api/v1/posts", (req, res) => {
  const user = User.find({id: 1})
  const posts = fs.readFileSync("./data/posts.json", "utf-8").toString();
  res.status(200).send(posts);
});

app.get("/api/v1/user", async (req, res) => {
  const user = await User.find({id: 1})
  // const user = fs.readFileSync("./data/user.json", "utf-8").toString();
  res.status(200).send(user[0]);
});


app.post("/api/v1/user", (req , resp)=>{
  const id = req.query.id;
  const newUser = {
  email: "test@test.com",
  username: "sudip",
  fullname: "Sudip Timalsina",
  title: "Software Developer",
  skills: ["JS", "PHP", "JAVA"],
  address: "Kathmandu, Nepal",
  job_type: "Full Time",
  id: id,
  is_active: true,
  followers: [],
  followings: [],
}
  User.create(newUser).then((createdUser) => {
    console.log("User Created");
    resp.status(200).send(createdUser);
  });
})

app.listen(PORT, () => {
  console.log("App is Running on port " + PORT);
});
