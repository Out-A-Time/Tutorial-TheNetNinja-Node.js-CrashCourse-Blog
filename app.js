const express = require("express");
const morgan = require("morgan");
const mongoose = require("mongoose");
const dotenv = require("dotenv").config();

const PORT = 3000;

const mongoUSER = process.env.mongoUSER;
const mongoPASSWORD = process.env.mongoPASSWORD;

const { render } = require("ejs");
const blogRoutes = require("./routes/blogRoutes");

//express app
const app = express();

//Connect to mongodb
const mongoURI = `mongodb+srv://${mongoUSER}:${mongoPASSWORD}@mongodb-cluster0.99qmncj.mongodb.net/NinjaBlog?retryWrites=true&w=majority`;

mongoose
  .connect(mongoURI)
  .then((result) => {
    console.log("Connected to mongoDB");
    //Listen for requests only after connection to DB has been established!
    app.listen(PORT, function () {
      console.log(`Server is up and running at: http://localhost:${PORT}`);
    });
  })
  .catch((err) => {
    console.log(err);
  });

//register view engine
app.set("view engine", "ejs");
//In case we would like to change location of ejs files we can do that with:
// app.set("views", "myviews_or other location");

// //Middleware example:
// app.use((req, res, next) => {
//   console.log("new request made:");
//   console.log("host:", req.hostname);
//   console.log("path:", req.path);
//   console.log("method:", req.method);
//   next();
// });

//Middleware and static files:
app.use(express.static("public"));
//helps to create req.body for POST request ⤵
app.use(express.urlencoded({ extended: true }));
app.use(morgan("dev"));

//TESTING DATABASE
//mongoose and mongo sanbox routes
// app.get("/add-blog", (req, res) => {
//   const blog = new Blog({
//     title: "New Blog 2",
//     snippet: "About my new blog",
//     body: "more info about my new blog super extra dupa dupa",
//   });
//   blog
//     .save()
//     .then((result) => {
//       res.send(result);
//     })
//     .catch((err) => {
//       console.log(err);
//     });
// });

// app.get("/all-blogs", (req, res) => {
//   Blog.find()
//     .then((result) => {
//       res.send(result);
//     })
//     .catch((err) => {
//       console.log(err);
//     });
// });

// app.get("/single-blog", (req, res) => {
//   Blog.findById("6330297806805b65f3870551")
//     .then((result) => {
//       res.send(result);
//     })
//     .catch((err) => {
//       console.log(err);
//     });
// });

//Routes
app.get("/", (req, res) => {
  res.redirect("/blogs");

  // res.render("index", { title: "Home", allBlogs: blogs }); //if allBlogs would be blogs then one blogs can be removed
});

app.get("/about", (req, res) => {
  //   res.send("<h1>HELLO FROM About PAGE</h1>");
  res.render("about", { title: "About" });
});

//Blog Routes
app.use("/blogs", blogRoutes);

//404 Page - default case
//We use method .use() to create middleware thats fire middleware functions in Express
//Should be at the end of the all .get(), if previous paths won't match it will fire 404
app.use((req, res) => {
  res.status(404).render("404", { title: "Error" });
});
