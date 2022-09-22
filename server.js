const http = require("http");
const fs = require("fs");
const _ = require("lodash");

const server = http.createServer((req, res) => {
  console.log(req.url, req.method);

  //lodash

  //set header content type
  res.setHeader("Content-Type", "text/html");
  //   res.write("<h1>Hello Ninja</h1>");
  //   res.write("<p>Hello Ninja as paragraph</p>");
  //   res.end();

  //THIS Switch Statement IS HOW WE WOULD DEAL WITH ROUTING WITHOUT NPM PACKAGE: EXPRESS
  //IT'S OK WITH SIMPLE WEBSITES, BUT IT GETTING HARDER TO MAINTAIN WHEN WEB GROWS
  //ESPECIALLY WHEN WE ADD CRUD operations

  let path = "./views/";
  switch (req.url) {
    case "/":
      path += "index.html";
      res.statusCode = 200;
      break;
    case "/about":
      path += "about.html";
      res.statusCode = 200;
      break;
    case "/about-me":
      res.statusCode = 301;
      res.setHeader("Location", "/about");
      res.end();
      break;
    default:
      path += "404.html";
      res.statusCode = 404;
      break;
  }

  //send an html file
  fs.readFile(path, (err, data) => {
    if (err) {
      console.log(err);
      res.end();
    } else {
      //   res.write(data);
      //   res.end();
      //only if passing one 'write' we can do as below:

      res.end(data);
    }
  });
});

server.listen(3000, "localhost", () => {
  console.log("Server is up and running at port 3000");
});
