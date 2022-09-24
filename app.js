const express = require("express");
const morgan = require("morgan");

const PORT = 3000;

URI =
  "mongodb+srv://Out-A-Time:xxx>@mongodb-cluster0.99qmncj.mongodb.net/?retryWrites=true&w=majority";

//express app
const app = express();

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
app.use(morgan("dev"));

//Routing
app.get("/", (req, res) => {
  const blogs = [
    {
      title: "Yoshi find eggs",
      snippet: "Lorem ipsum dolor sit amet consectetur",
    },
    {
      title: "Mario fighting with Wario",
      snippet: "Lorem ipsum dolor sit amet consectetur",
    },
    {
      title: "How to defeat Bowser",
      snippet: "Lorem ipsum dolor sit amet consectetur",
    },
  ];

  //   res.send("<h1>HELLO FROM LANDING PAGE</h1>");
  res.render("index", { title: "Home", allBlogs: blogs }); //if allBlogs would be blogs then one blogs can be removed
});

app.get("/about", (req, res) => {
  //   res.send("<h1>HELLO FROM About PAGE</h1>");
  res.render("about", { title: "About" });
});

app.get("/blogs/create", (req, res) => {
  res.render("create", { title: "Create a new blog" });
});

//404 Page - default case
//We use method .use() to create middleware thats fire middleware functions in Express
//Should be at the end of the all .get(), if previous paths won't match it will fire 404
app.use((req, res) => {
  res.status(404).render("404", { title: "Error" });
});

//Listen for requests
app.listen(PORT, function () {
  console.log(`Server is up and running at: http://localhost:${PORT}`);
});
