const mongoose = require("mongoose");
const Schema = mongoose.Schema;

//Schema define the structure of our document
const blogSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    snippet: {
      type: String,
      required: true,
    },
    body: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

//Model surrounds that and then provides us with an interface by which to communicate with a database collection for that document type
const Blog = mongoose.model("Blog", blogSchema);

module.exports = Blog;
