const express = require("express");

const PORT = 3000;

//express app
const app = express();

//register view engine
app.set("view engine", "ejs");
//In case we would like to change location of ejs files we can do that with:
// app.set("views", "myviews_or other location");

//Routing
app.get("/", (req, res) => {
  //   res.send("<h1>HELLO FROM LANDING PAGE</h1>");
  res.sendFile("./views/index.html", { root: __dirname });
});

app.get("/about", (req, res) => {
  //   res.send("<h1>HELLO FROM About PAGE</h1>");
  res.sendFile("./views/about.html", { root: __dirname });
});

//Redirects
app.get("/about-us", (req, res) => {
  res.redirect("/about");
});

//404 Page - default case
//We use method .use() to create middleware thats fire middleware functions in Express
//Should be at the end of the all .get(), if previous paths won't match it will fire 404
app.use((req, res) => {
  res.status(404).sendFile("./views/404.html", { root: __dirname });
});

//Listen for requests
app.listen(PORT, function () {
  console.log(`Server is up and running at: http://localhost:${PORT}`);
});
