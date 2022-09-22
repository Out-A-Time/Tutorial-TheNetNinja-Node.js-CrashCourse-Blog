const { ages, people } = require("./test2.js");
const os = require("os");
const fs = require("fs"); //importing File System

console.log("from test1:", people);
console.log("from test1:", ages);

console.log(os);
console.log(os.platform()); //platform
console.log(os.homedir()); //home directory on computer
